import { gql } from '@apollo/client';

export const POST_JOB = gql`
  mutation PostJob($input: PostJobInput!) {
    postJob(input: $input) {
      id
      title
      description
    }
  }
`;

export const APPLY_JOB = gql`
  mutation ApplyJob($jobId: ID!) {
    applyJob(jobId: $jobId) {
      id
      user {
        id
        name
      }
    }
  }
`;
