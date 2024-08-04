import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_JOB_DETAILS } from '../../api/graphql/queries';

const JobApplications = ({ jobId }) => {
  const { data, loading, error } = useQuery(GET_JOB_DETAILS, {
    variables: { id: jobId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading job details</p>;

  return (
    <div>
      <h2>Applications for Job {data?.job?.title}</h2>
      <ul>
        {data?.job?.applications.map((application) => (
          <li key={application?.user?.id}>
            {application?.user?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobApplications;
