"use client";

import { useState, useEffect } from "react";
import type { Post } from "@/payload-types";
import BlogPostCard from "@/components/blog/BlogPostCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { motion } from "motion/react";

interface BlogPostsProps {
  posts: Post[];
  highlightedTag?: string;
  maxPosts?: number;
  pagination?: boolean;
}

// Animation variants for the container and items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

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
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (windowWidth < 768) {
      setPostsPerPage(5);
    } else if (windowWidth < 1024) {
      setPostsPerPage(4);
    } else {
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
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-8">
      <motion.div
        className={`grid grid-cols-1 gap-8 ${maxPosts === 1 ? "md:grid-cols-1" : maxPosts === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {currentPosts.map((post) => (
          <BlogPostCard
            key={post.id}
            post={post}
            highlightedTag={highlightedTag}
            variants={itemVariants}
          />
        ))}
      </motion.div>

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
