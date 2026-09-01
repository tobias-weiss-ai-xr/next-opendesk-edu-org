"use client";

import { useSearchOpen } from "@/components/SearchContext";
import SearchDialog from "@/components/SearchDialog";

export default function SearchDialogWrapper() {
  const { open, closeSearch } = useSearchOpen();

  return <SearchDialog open={open} onClose={closeSearch} />;
}
