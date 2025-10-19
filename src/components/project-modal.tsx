import { Repo } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaStar } from "react-icons/fa";
import { FiExternalLink, FiX } from "react-icons/fi";

type ProjectModalProps = {
  repo: Repo | null;
  onClose: () => void;
};

export default function ProjectModal({ repo, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {repo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white dark:bg-gray-900 p-8 rounded-lg max-w-2xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <FiX size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">{repo.name}</h2>
            <p className="text-gray-700 dark:text-white/70 mb-4">{repo.description}</p>
            <div className="flex gap-4 mb-4">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                <FaGithub /> GitHub
              </a>
              {repo.homepage && (
                <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                  <FiExternalLink /> Demo
                </a>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-white/60">
              <div className="flex items-center gap-1">
                <div className={`w-3 h-3 rounded-full ${repo.language ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                <span>{repo.language || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaStar />
                <span>{repo.stargazers_count}</span>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold">Topics:</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {repo.topics.map((topic) => (
                  <span key={topic} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md text-sm">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}