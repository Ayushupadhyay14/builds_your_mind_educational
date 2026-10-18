// P13 - Case Studies (/case-studies).
// STRUCTURE ONLY: no case study exists yet, so no case study is published.
// Fill this file from real, completed workshops ONLY, and only where the
// institution has given written permission. Do not invent anything.
//
// How to add one: copy the shape of caseStudyTemplate below into caseStudies.
// A case study is shown on the live page only when permissionGranted is true.

export const caseStudyTemplate = {
  institution: '', // e.g. "<School / College name>" - publish only with written permission
  city: '',
  programme: '', // which programme or workshop ran, e.g. "Robotics workshop, Class 8"
  whatStudentsDid: '', // what students actually built or did during the session
  whatStudentsLearned: '',
  photos: [], // real photos from the session (no stock images), with permission
  feedback: '', // quote from the institution - publish only with permission
  permissionGranted: false, // must be true before this entry is shown publicly
};

// Real, permission-confirmed case studies go here. Empty until you add them.
export const caseStudies = [];

export const caseStudyButton = 'Invite Us to Your Institution'; // sheet, P13 L14

// Sheet, P13 M14 - "Link To These Pages"
export const caseStudyLinks = [
  { name: 'STEM Workshops for Schools in Indore', path: '/stem-workshops-schools-indore' },
  { name: 'Robotics Workshops for Schools in Indore', path: '/robotics-workshops-schools-indore' },
  { name: 'School STEM Programme in Indore', path: '/school-stem-programme-indore' },
  { name: 'Workshop Enquiry & Contact', path: '/contact' },
];
