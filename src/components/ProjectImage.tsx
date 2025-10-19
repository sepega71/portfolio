"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ProjectImageProps {
  repoName: string;
}

export default function ProjectImage({ repoName }: ProjectImageProps) {
  const [imgSrc, setImgSrc] = useState(`/projects/${repoName}.png`);

  useEffect(() => {
    setImgSrc(`/projects/${repoName}.png`);
  }, [repoName]);

  return (
    <Image
      src={imgSrc}
      alt={`Preview of ${repoName}`}
      width={400}
      height={250}
      className="w-full h-40 object-cover object-top"
      onError={() => {
        // Only set the placeholder if the current src is not already the placeholder
        if (imgSrc !== '/projects/placeholder.png') {
            setImgSrc('/projects/placeholder.png');
        }
      }}
    />
  );
}