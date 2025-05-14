"use client";

import { useState, useEffect } from "react";
import type { BlogPost } from "@/lib/types";
import BlogPostCard from "@/components/blog/BlogPostCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BlogPostsProps {
  posts: BlogPost[];
  highlightedTag?: string;
  maxPosts?: number;
  pagination?: boolean;
}

export default function BlogPosts({
  posts,
  highlightedTag,
  maxPosts,
  pagination = true,
}: BlogPostsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Update windowWidth when resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Adjust posts per page based on screen size
    if (windowWidth < 768) {
      // Mobile
      setPostsPerPage(5);
    } else if (windowWidth < 1024) {
      // Tablet
      setPostsPerPage(4);
    } else {
      // Desktop
      setPostsPerPage(6);
    }
  }, [windowWidth]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const displayedPosts = maxPosts ? posts.slice(0, maxPosts) : posts;

  const currentPosts = pagination
    ? displayedPosts.slice(indexOfFirstPost, indexOfLastPost)
    : displayedPosts;

  const totalPages = Math.ceil(displayedPosts.length / postsPerPage);

  const handlePageChange = (pageNumber: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-8">
      <div
        className={`grid grid-cols-1 gap-8 ${maxPosts === 1 ? "md:grid-cols-1" : maxPosts === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}
      >
        {currentPosts.map((post) => (
          <BlogPostCard
            key={post.slug}
            post={post}
            highlightedTag={highlightedTag}
          />
        ))}
      </div>

      {pagination && totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                />
              </PaginationItem>
            )}

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
