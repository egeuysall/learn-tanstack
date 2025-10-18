import { BlogResponse } from "@/types/blog";

export async function fetchBlogs(page: number, limit: number): Promise<BlogResponse> {
  const response = await fetch(`https://blogapi.egeuysal.com:8443/v1/blogs?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return response.json();
}
