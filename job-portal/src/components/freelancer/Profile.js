import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useQuery } from '@apollo/client';
import { GET_GITHUB_REPOS } from '../../api/graphql/queries';


const Profile = () => {
  const [githubUsername, setGithubUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [errors, setErrors] = useState(null);

  const { data, loading, error } = useQuery(GET_GITHUB_REPOS, {
    variables: { username: githubUsername },
    skip: !githubUsername,
  });


  const formik = useFormik({
    initialValues: {
      skills: '',
      github: '',
    },
    validationSchema: Yup.object({
      skills: Yup.string().required('Required'),
      github: Yup.string().url('Invalid URL').required('Required'),
    }),

    onSubmit: async (values) => {
      setGithubUsername(values.github.split('/').pop());
      try {
        // Fetch GitHub repositories
        const username = values.github.split('/').pop(); // Extract username from URL
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        setRepos(response.data);
        setErrors(null);
      } catch (err) {
        setErrors('Failed to fetch repositories. Please check the GitHub username.');
        setRepos([]);
      }
    },

  });

  return (
    <div>
      <h2>Freelancer Profile</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="skills">Skills</label>
        <input
          id="skills"
          name="skills"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.skills}
        />
        {formik.errors.skills ? <div>{formik.errors.skills}</div> : null}

        <label htmlFor="github">GitHub Profile</label>
        <input
          id="github"
          name="github"
          type="url"
          onChange={formik.handleChange}
          value={formik.values.github}
        />
        {formik.errors.github ? <div>{formik.errors.github}</div> : null}

        <button type="submit">Save</button>
      </form>

      {loading && <p>Loading GitHub repos...</p>}
      {error && <p>Error fetching GitHub repos {error} </p>}
      {data && (
        <div>
          <h3>GitHub Repositories</h3>
          <ul>
            {data.user.repositories.nodes.map((repo) => (
              <li key={repo.id}>
                <a href={repo.url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;

