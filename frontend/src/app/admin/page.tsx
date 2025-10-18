"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormStore } from "@/stores/formStore";
import { createBlog } from "@/lib/api";
import { useShallow } from "zustand/shallow";

export default function AdminPage() {
  const queryClient = useQueryClient();
  const { title, setTitle, slug, setSlug, author, setAuthor, cover_link, setCoverLink, tags, setTags, content, setContent, resetForm } = useFormStore(
    useShallow((state) => ({
      title: state.title,
      setTitle: state.setTitle,
      slug: state.slug,
      setSlug: state.setSlug,
      author: state.author,
      setAuthor: state.setAuthor,
      cover_link: state.cover_link,
      setCoverLink: state.setCoverLink,
      tags: state.tags,
      setTags: state.setTags,
      content: state.content,
      setContent: state.setContent,
      resetForm: state.resetForm,
    })),
  );

  const createMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      console.log("Blog created successfully!");
      alert("Blog created successfully!");
      resetForm();
      // Invalidate blogs query so it refetches on the blogs page
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      console.error("Failed to create blog:", error);
      alert("Failed to create blog: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createMutation.mutate({
      title,
      slug,
      author,
      cover_link,
      tags: tags.split(",").map((t) => t.trim()),
      content,
    });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin - Create Blog</h1>

        <form onSubmit={handleSubmit} className="border-neutral-300 border p-8 rounded-lg space-y-6 bg-white shadow">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border-neutral-300 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="My Awesome Blog Post"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Slug *</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="w-full px-4 py-2 border-neutral-300 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="my-awesome-blog-post"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Author *</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full px-4 py-2 border-neutral-300 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ege Uysal"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cover Image URL *</label>
            <input
              type="url"
              value={cover_link}
              onChange={(e) => setCoverLink(e.target.value)}
              required
              className="w-full px-4 py-2 border-neutral-300 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags * (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
              className="w-full px-4 py-2 border-neutral-300 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="technology, coding, tutorial"
            />
            <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content *</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={10}
              className="w-full px-4 py-2 border-neutral-300 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-sm"
              placeholder="Write your blog content here...&#10;&#10;You can use markdown!"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="flex-1 py-3 bg-blue-500 hover:enabled:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
            >
              {createMutation.isPending ? "Creating..." : "Create Blog"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
            >
              Clear Form
            </button>
          </div>
        </form>

        {createMutation.isSuccess && <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">✅ Blog created successfully! Check the blogs page.</div>}

        {createMutation.isError && <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">❌ Error: {createMutation.error.message}</div>}
      </div>
    </div>
  );
}
