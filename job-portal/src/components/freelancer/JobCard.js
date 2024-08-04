import React from 'react';
import { useMutation } from '@apollo/client';
import { APPLY_JOB } from '../../api/graphql/mutations';

const JobCard = ({ job }) => {
  const [applyJob, { loading, error }] = useMutation(APPLY_JOB);

  const handleQuickApply = async () => {
    try {
      await applyJob({ variables: { jobId: job?.id } });
      alert('Applied successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>{job?.title}</h3>
      <p>{job?.description}</p>
      <p>Skills: {job?.skills.join(', ')}</p>
      <p>Salary: ${job?.salary} per hour</p>
      <button onClick={handleQuickApply} disabled={loading}>
        Quick Apply
      </button>
      {error && <p>Error applying for the job</p>}
    </div>
  );
};

export default JobCard;
