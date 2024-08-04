import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_JOBS } from '../../api/graphql/queries';
import JobCard from '../freelancer/JobCard';

const JobList = () => {
  const { data, loading, error } = useQuery(GET_JOBS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading jobs</p>;

  return (
    <div>
      <h2>My Job Listings</h2>
      <div>
        {data.jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};


export default JobList;
