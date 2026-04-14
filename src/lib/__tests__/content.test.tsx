import { describe, it, expect, vi, beforeEach } from "vitest";
import fs from "fs";
import matter from "gray-matter";
import type { PathLike } from "fs";

// Mock fs module
vi.mock("fs", () => ({
  default: {
    existsSync: vi.fn(),
    readdirSync: vi.fn(),
    promises: {
      readFile: vi.fn(),
    },
  },
  existsSync: vi.fn(),
  readdirSync: vi.fn(),
}));

// Mock gray-matter
vi.mock("gray-matter", () => ({
  default: vi.fn(),
}));

// Mock remark pipeline
vi.mock("remark", () => ({
  remark: () => ({
    use: vi.fn().mockReturnThis(),
    process: vi.fn().mockResolvedValue({ toString: () => "<p>processed</p>" }),
  }),
}));

// Import after mocks
import { getPostBySlug, getPostsBySection, getAllPosts, isValidSection, getSectionBySlug, getStaticPathsForSection } from "@/lib/content";

const mockExistsSync = vi.mocked(fs.existsSync);
const mockReaddirSync = vi.mocked(fs.readdirSync);
const mockReadFile = vi.mocked(fs.promises.readFile);
const mockMatter = vi.mocked(matter);

const sampleFrontmatter = `---
title: Test Post
date: 2024-01-15
description: A test post
tags: [test, edu]
---
# Hello World
`;

const sampleData = {
  title: "Test Post",
  date: "2024-01-15",
  description: "A test post",
  tags: ["test", "edu"],
};

beforeEach(() => {
  vi.clearAllMocks();
  mockExistsSync.mockReturnValue(true);
  mockReaddirSync.mockReturnValue(["test-post.md"] as never);
  mockReadFile.mockResolvedValue(sampleFrontmatter as never);
  mockMatter.mockReturnValue({
    data: sampleData,
    content: "# Hello World\n",
    excerpt: "",
  } as never);
});

describe("content.ts", () => {
  describe("isValidSection", () => {
    it("returns true for valid sections", () => {
      expect(isValidSection("components")).toBe(true);
      expect(isValidSection("architecture")).toBe(true);
      expect(isValidSection("get-started")).toBe(true);
      expect(isValidSection("blog")).toBe(true);
    });

    it("returns false for invalid sections", () => {
      expect(isValidSection("invalid")).toBe(false);
      expect(isValidSection("")).toBe(false);
      expect(isValidSection("components-extra")).toBe(false);
    });
  });

  describe("getSectionBySlug", () => {
    it("returns section info for valid slug", () => {
      const section = getSectionBySlug("components");
      expect(section).toBeDefined();
      expect(section?.slug).toBe("components");
      expect(section?.title).toBe("Components");
    });

    it("returns undefined for invalid slug", () => {
      expect(getSectionBySlug("nonexistent")).toBeUndefined();
    });
  });

  describe("getPostBySlug", () => {
    it("returns a post when found via direct match", async () => {
      const post = await getPostBySlug("components", "test-post");
      expect(post).not.toBeNull();
      expect(post?.title).toBe("Test Post");
      expect(post?.slug).toBe("test-post");
      expect(post?.section).toBe("components");
      expect(post?.htmlContent).toBe("<p>processed</p>");
    });

    it("returns null when section directory does not exist", async () => {
      mockExistsSync.mockReturnValue(false);
      const post = await getPostBySlug("nonexistent", "test-post");
      expect(post).toBeNull();
    });

    it("returns null when post not found", async () => {
      // existsSync returns true for directory, false for the candidate file
      mockExistsSync.mockImplementation((p: PathLike) => {
        if (typeof p === "string" && p.endsWith("test-post.md")) return false;
        return true;
      });
      mockReaddirSync.mockReturnValue(["other-post.md"] as never);
      const post = await getPostBySlug("components", "test-post");
      expect(post).toBeNull();
    });
  });

  describe("getPostsBySection", () => {
    it("returns posts sorted by date descending", async () => {
      const post = await getPostsBySection("components");
      expect(post).toHaveLength(1);
      expect(post[0].title).toBe("Test Post");
    });

    it("returns empty array when section directory does not exist", async () => {
      mockExistsSync.mockReturnValue(false);
      const post = await getPostsBySection("nonexistent");
      expect(post).toEqual([]);
    });

    it("filters out draft posts", async () => {
      mockMatter.mockReturnValue({
        data: { ...sampleData, draft: true },
        content: "# Draft\n",
        excerpt: "",
      } as never);
      const posts = await getPostsBySection("components");
      expect(posts).toHaveLength(0);
    });

    it("handles invalid content files gracefully", async () => {
      mockReaddirSync.mockReturnValue(["_index.md", "test-post.md", "backup.bak"] as never);
      const posts = await getPostsBySection("components");
      expect(posts).toHaveLength(1);
    });
  });

  describe("getAllPosts", () => {
    it("returns posts from all sections", async () => {
      const posts = await getAllPosts();
      // 4 sections, each with 1 post = 4 posts
      expect(posts.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe("getStaticPathsForSection", () => {
    it("returns slug array for a section", async () => {
      const paths = await getStaticPathsForSection("components");
      expect(paths).toEqual(["test-post"]);
    });
  });
});
