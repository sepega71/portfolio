"use client";

import React, { useState, useMemo } from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import { useGitHubRepos } from "@/lib/github";
import { FaGithub, FaStar } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import clsx from "clsx";
import ProjectModal from "./project-modal";
import { Repo } from "@/lib/types";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.2);
  const { repos, isLoading, isError } = useGitHubRepos();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  const allTopics = useMemo(() => {
    if (!repos) return [];
    const topics = new Set<string>();
    repos.forEach((repo) => {
      repo.topics.forEach((topic) => topics.add(topic));
    });
    return Array.from(topics);
  }, [repos]);

  const filteredRepos = useMemo(() => {
    if (selectedTopics.length === 0) return repos;
    return repos?.filter((repo) =>
      selectedTopics.every((topic) => repo.topics.includes(topic))
    );
  }, [repos, selectedTopics]);

  const handleTopicClick = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  return (
    <>
      <section ref={ref} id="projects" className="scroll-mt-28 mb-28 w-[min(100%,90rem)]">
        <SectionHeading>My projects</SectionHeading>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {allTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => handleTopicClick(topic)}
              className={clsx(
                "px-4 py-2 text-sm rounded-full transition",
                {
                  "bg-gray-900 text-white dark:bg-white/10 dark:text-white/80": selectedTopics.includes(topic),
                  "bg-white border border-black/10 dark:bg-gray-800 dark:border-white/20": !selectedTopics.includes(topic),
                }
              )}
            >
              {topic}
            </button>
          ))}
        </div>
        
        {isLoading && <p className="text-center">Loading projects...</p>}
        {isError && <p className="text-center text-red-500">Failed to load projects.</p>}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos &&
            filteredRepos.map((repo) => (
              <motion.div
                key={repo.id}
                className="bg-white border border-black/5 rounded-lg overflow-hidden dark:bg-white/10 dark:border-white/20 cursor-pointer"
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setSelectedRepo(repo)}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold">{repo.name}</h3>
                    <div className="flex items-center gap-4">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:text-gray-950 dark:hover:text-white" onClick={(e) => e.stopPropagation()}>
                        <FaGithub size={20} />
                      </a>
                      {repo.homepage && (
                        <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="hover:text-gray-950 dark:hover:text-white" onClick={(e) => e.stopPropagation()}>
                          <FiExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-700 dark:text-white/70">{repo.description}</p>
                  <div className="mt-4 flex justify-between items-center text-xs text-gray-600 dark:text-white/60">
                    <div className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-full ${repo.language ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                      <span>{repo.language || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaStar />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </section>
      <ProjectModal repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
    </>
  );
}