import * as Yup from 'yup';

export const jobValidationSchema = Yup.object({
  title: Yup.string().required('Required'),
  description: Yup.string().max(16384, 'Maximum length is 16KB').required('Required'),
  requirements: Yup.string().required('Required'),
  tags: Yup.string().required('Required'),
  companyName: Yup.string().required('Required'),
  contactInfo: Yup.string().required('Required'),
});

export const profileValidationSchema = Yup.object({
  skills: Yup.string().required('Required'),
  github: Yup.string().url('Invalid URL').required('Required'),
});
