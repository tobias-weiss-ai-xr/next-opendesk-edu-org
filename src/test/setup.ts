import "@testing-library/jest-dom";

// Mock IntersectionObserver for components that use it
global.IntersectionObserver = class MockIntersectionObserver {
  root = null;
  rootMargin = "";
  thresholds = [];
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve() {}
} as unknown as typeof IntersectionObserver;
