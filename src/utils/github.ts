import { Octokit } from 'octokit';

const octokit = new Octokit();

const CHILL_TECH_STACK = [
  'typescript',
  'javascript',
  'python',
  'ruby',
  'go',
  'rust',
  'react',
  'vue',
  'svelte',
  'nextjs',
  'tailwindcss',
  'c',
  'cpp',
  'cuda',
  'shell'
];

const CHILL_METRICS = {
  maxRepos: 50,
  maxCommitsPerDay: 10,
  idealCommitMessageLength: 50,
  idealIssueResponseTime: 48, // hours
};

export async function calculateChillScore(username: string): Promise<number> {
  try {
    // Fetch user data
    const { data: user } = await octokit.rest.users.getByUsername({
      username,
    });

    // Fetch repos
    const { data: repos } = await octokit.rest.repos.listForUser({
      username,
      per_page: 100,
      sort: 'updated',
    });

    // Calculate various chill factors
    const repoCount = Math.min(repos.length, CHILL_METRICS.maxRepos);
    const repoScore = (repoCount / CHILL_METRICS.maxRepos) * 25;

    // Calculate tech stack score
    const languages = new Set(repos.map(repo => repo.language?.toLowerCase()).filter(Boolean));
    const chillTechCount = CHILL_TECH_STACK.filter(tech => 
      Array.from(languages).some(lang => lang.includes(tech))
    ).length;
    const techScore = (chillTechCount / CHILL_TECH_STACK.length) * 25;

    // Activity score based on contribution frequency
    const activityScore = Math.min(
      (user.public_repos / CHILL_METRICS.maxRepos) * 25,
      25
    );

    // Profile completeness score
    const profileScore = [
      user.name,
      user.bio,
      user.location,
      user.blog,
      user.twitter_username,
    ].filter(Boolean).length * 5;

    // Calculate final score
    const totalScore = Math.min(
      Math.round(repoScore + techScore + activityScore + profileScore),
      100
    );

    return totalScore;
  } catch (error) {
    console.error('Error calculating chill score:', error);
    throw new Error('Failed to calculate chill score');
  }
}