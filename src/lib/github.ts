import useSWR from 'swr';
import { Repo } from './types';

const GITHUB_API_URL = 'https://api.github.com';
const USERNAME = 'sepega71'; // ЗАМЕНИТЕ НА ВАШ ЮЗЕРНЕЙМ

const fetcher = (url: string): Promise<Repo[]> =>
  fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error('An error occurred while fetching the data.');
    }
    return res.json();
  });

export function useGitHubRepos() {
  const { data, error } = useSWR<Repo[]>(
    `${GITHUB_API_URL}/users/${USERNAME}/repos?sort=updated&per_page=100`,
    fetcher
  );

  return {
    repos: data,
    isLoading: !error && !data,
    isError: error,
  };
}