// src/stores/blogStore.ts
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type BlogState = {
  currentPage: number;
  limit: number;
  selectedBlogId: string | null;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSelectedBlog: (id: string | null) => void;
  nextPage: () => void;
  prevPage: () => void;
};

export const useBlogStore = create<BlogState>()(
  persist(
    (set) => ({
      currentPage: 1,
      limit: 9,
      selectedBlogId: null,

      setPage: (page) => set({ currentPage: page }),
      setLimit: (limit) => set({ limit, currentPage: 1 }),
      setSelectedBlog: (id) => set({ selectedBlogId: id }),

      nextPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
      prevPage: () =>
        set((state) => ({
          currentPage: Math.max(1, state.currentPage - 1),
        })),
    }),
    {
      name: "blog-pagination",
    },
  ),
);
