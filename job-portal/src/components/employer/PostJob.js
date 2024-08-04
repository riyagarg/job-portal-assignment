import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { POST_JOB } from '../../api/graphql/mutations';

const PostJob = () => {
  const [postJob, { loading, error }] = useMutation(POST_JOB);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      requirements: '',
      tags: '',
      companyName: '',
      contactInfo: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      description: Yup.string().max(16384, 'Maximum length is 16KB').required('Required'),
      requirements: Yup.string().required('Required'),
      tags: Yup.string().required('Required'),
      companyName: Yup.string().required('Required'),
      contactInfo: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await postJob({ variables: { input: values } });
        formik.resetForm();
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div>
      <h2>Post a Job</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="title">Job Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        {formik.errors.title ? <div>{formik.errors.title}</div> : null}

        <label htmlFor="description">Job Description</label>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        {formik.errors.description ? <div>{formik.errors.description}</div> : null}

        <label htmlFor="requirements">Job Requirements</label>
        <textarea
          id="requirements"
          name="requirements"
          onChange={formik.handleChange}
          value={formik.values.requirements}
        />
        {formik.errors.requirements ? <div>{formik.errors.requirements}</div> : null}

        <label htmlFor="tags">Tags</label>
        <input
          id="tags"
          name="tags"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.tags}
        />
        {formik.errors.tags ? <div>{formik.errors.tags}</div> : null}

        <label htmlFor="companyName">Company Name</label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.companyName}
        />
        {formik.errors.companyName ? <div>{formik.errors.companyName}</div> : null}

        <label htmlFor="contactInfo">Contact Info</label>
        <input
          id="contactInfo"
          name="contactInfo"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.contactInfo}
        />
        {formik.errors.contactInfo ? <div>{formik.errors.contactInfo}</div> : null}

        <button type="submit">Post Job</button>
      </form>
      {loading && <p>Posting job...</p>}
      {error && <p>Error posting job</p>}
    </div>
  );
};

export default PostJob;

