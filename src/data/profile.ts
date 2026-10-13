// Facts that change over time live here, so a date, role or availability
// update is a single edit. Longer-form content lives in src/content/.

export const profile = {
  name: 'K.L. Bhanu Moorthy',
  headline: 'Computer vision on aerial, satellite and video data, from research to production.',
  yearsOfExperience: '8+',
  location: 'Hyderabad, India',
  city: 'Hyderabad',
  availability: 'open to remote or relocation',
  targetRoles: [
    'Computer Vision Engineer',
    'Senior ML Engineer (Computer Vision)',
    'Applied Scientist (Computer Vision)',
  ],
  focus: 'aerial, satellite and geospatial imagery and video',
  email: 'klbm9999@gmail.com',
  links: {
    resume: '/resume.pdf',
    github: 'https://github.com/klbm9999',
    scholar: 'https://scholar.google.com/citations?user=COmcp_IAAAAJ&hl=en',
    linkedin: 'https://www.linkedin.com/in/k-l-bhanu-moorthy-bb6023b7/',
  },
  employer: {
    name: 'Granular AI',
    start: 2022,
    roles: [
      { title: 'AI technical lead', start: 2024 },
      { title: 'ML engineer', start: 2022, end: 2023 },
    ],
  },
  research: {
    lab: 'CVIT, IIIT Hyderabad',
    start: 2018,
    end: 2021,
    areas: 'video understanding, shot selection and automated editorial decisions',
    fellowship: { name: 'TCS Research Fellowship', year: 2020 },
  },
  education: {
    degree: 'B.Tech in Computer Engineering',
    school: 'IIITDM Kancheepuram',
    start: 2013,
    end: 2017,
  },
  skills: ['Python', 'PyTorch', 'OpenCV', 'FastAPI', 'Flask', 'Docker', 'Kubernetes', 'AWS', 'GCS', 'Bash'],
} as const;
