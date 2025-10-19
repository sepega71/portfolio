"use client";

import { motion } from "framer-motion";
import React from "react";

export default function SectionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.section
      className="w-full"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
    >
      {children}
    </motion.section>
  );
}