import { BlogResponse } from "@/types/blog";
import { CreateBlogData } from "@/types/blog";

export async function fetchBlogs(page: number, limit: number): Promise<BlogResponse> {
  const response = await fetch(`https://blogapi.egeuysal.com:8443/v1/blogs?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return response.json();
}

export async function createBlog(blogData: CreateBlogData): Promise<any> {
  const JWT_TOKEN = process.env.NEXT_PUBLIC_JWT_TOKEN;

  if (!JWT_TOKEN) {
    throw new Error("JWT token not found. Add NEXT_PUBLIC_JWT_TOKEN to .env.local");
  }

  const response = await fetch("https://blogapi.egeuysal.com:8443/v1/blogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JWT_TOKEN}`,
    },
    body: JSON.stringify(blogData),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create blog: ${error}`);
  }

  return response.json();
}
