"use client";

import { useQuery } from "@tanstack/react-query";
import { useBlogStore } from "@/stores/blogStore";
import { fetchBlogs } from "@/lib/api";
import { useShallow } from "zustand/shallow";
import Link from "next/link";

export default function TanStackPage() {
  // Get pagination state from Zustand
  const { nextPage, prevPage, currentPage, limit } = useBlogStore(
    useShallow((state) => ({
      limit: state.limit,
      nextPage: state.nextPage,
      prevPage: state.prevPage,
      currentPage: state.currentPage,
    })),
  );

  // Fetch blogs with TanStack Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs", currentPage, limit],
    queryFn: () => fetchBlogs(currentPage, limit),
  });

  if (isLoading) {
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">Loading blogs...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4 text-red-500">Error!</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="p-8 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">My Blogs</h1>
          <p className="opacity-50 text-sm">No posts found.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={prevPage}
            className="bg-blue-500 disabled:opacity-75 disabled:cursor-not-allowed hover:enabled:bg-blue-600 transition-colors duration-200 ease-in-out text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
          >
            Previous
          </button>
          <button
            onClick={nextPage}
            disabled
            className="bg-blue-500 hover:enabled:bg-blue-600 disabled:opacity-75 disabled:cursor-not-allowed transition-colors duration-200 ease-in-out text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-4xl font-bold">My Blogs</h1>
        <p className="text-sm opacity-50">
          Page {currentPage} • Showing {limit} per page
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={prevPage}
          className="bg-blue-500 hover:enabled:bg-blue-600 disabled:opacity-75 disabled:cursor-not-allowed transition-colors duration-200 ease-in-out text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          className="bg-blue-500 hover:enabled:bg-blue-600 disabled:opacity-75 disabled:cursor-not-allowed transition-colors duration-200 ease-in-out text-white font-bold py-2 px-4 rounded-lg cursor-pointer"
        >
          Next
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data?.data.map((blog) => (
          <Link key={blog.id} className="cursor-pointer h-full" href={`https://www.blog.egeuysal.com/${blog.slug}`}>
            <div className="border border-neutral-300 p-6 rounded-lg h-full">
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-600 mb-2">By {blog.created_by}</p>
              <div className="flex gap-2 mb-4">
                {blog.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-900 font-medium rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="opacity-50 line-clamp-3">{blog.content}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
