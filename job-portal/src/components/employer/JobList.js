import React, { useState } from 'react';
import JobCard from '../freelancer/JobCard';
import { useQuery } from '@apollo/client';
import { GET_JOBS } from '../../api/graphql/queries';

const JobList = () => {
  const [filters, setFilters] = useState({ skill: '', minSalary: 0 });
  const { data, loading, error } = useQuery(GET_JOBS, {
    variables: { filters },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading jobs</p>;

  return (
    <div>
      <h2>Job Listings</h2>
      <div>
        <input
          type="text"
          placeholder="Skill"
          value={filters.skill}
          onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
        />
        <input
          type="number"
          placeholder="Min Salary"
          value={filters.minSalary}
          onChange={(e) => setFilters({ ...filters, minSalary: e.target.value })}
        />
      </div>
      <div>
        {data.jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
