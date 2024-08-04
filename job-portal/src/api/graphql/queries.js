import { gql } from '@apollo/client';

export const GET_GITHUB_REPOS = gql`
  query GetGithubRepos($username: String!) {
    user(login: $username) {
      repositories(first: 10) {
        nodes {
          id
          name
          url
        }
      }
    }
  }
`;

export const GET_JOBS = gql`
  query GetJobs($filters: JobFilters) {
    jobs(filters: $filters) {
      id
      title
      description
      skills
      salary
    }
  }
`;

export const GET_JOB_DETAILS = gql`
  query GetJobDetails($id: ID!) {
    job(id: $id) {
      id
      title
      description
      requirements
      tags
      companyName
      contactInfo
      applications {
        user {
          id
          name
        }
      }
    }
  }
`;

