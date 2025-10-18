// src/stores/formStore.ts
"use client";

import { create } from "zustand";

type FormState = {
  title: string;
  slug: string;
  author: string;
  cover_link: string;
  tags: string;
  content: string;

  setTitle: (title: string) => void;
  setSlug: (slug: string) => void;
  setAuthor: (author: string) => void;
  setCoverLink: (cover_link: string) => void;
  setTags: (tags: string) => void;
  setContent: (content: string) => void;
  resetForm: () => void;
};

export const useFormStore = create<FormState>((set) => ({
  title: "",
  slug: "",
  author: "",
  cover_link: "",
  tags: "",
  content: "",

  setTitle: (title) => set({ title }),
  setSlug: (slug) => set({ slug }),
  setAuthor: (author) => set({ author }),
  setCoverLink: (cover_link) => set({ cover_link }),
  setTags: (tags) => set({ tags }),
  setContent: (content) => set({ content }),

  resetForm: () =>
    set({
      title: "",
      slug: "",
      author: "",
      cover_link: "",
      tags: "",
      content: "",
    }),
}));
