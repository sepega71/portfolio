import { links } from "./data";

export type SectionName = (typeof links)[number]["name"];

export type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  stargazers_count: number;
  topics: string[];
};