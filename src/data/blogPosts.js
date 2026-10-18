// P14 - Blog (/blog).
// STRUCTURE ONLY. The 3 reserved outline slots hold TITLES ONLY, and the
// titles must come from the Content Topic Bank — they are NOT invented here.
// The user chose to share the bank file/rows separately, so the slots are
// clearly-labelled empties until that arrives.

export const blogPostTemplate = {
  title: '', // taken from the Content Topic Bank
  source: 'Content Topic Bank',
  status: 'draft',
};

export const blogPosts = []; // filled from the Content Topic Bank, titles only

export const RESERVED_OUTLINE_SLOTS = 3;

export const blogButton = 'Talk to Our Team'; // sheet, P14 L15

// Sheet, P14 M15 - "Link To These Pages"
export const blogLinks = [
  { name: 'STEM Workshops for Schools in Indore', path: '/stem-workshops-schools-indore' },
  { name: 'STEM Lab Setup & Programme for Schools in Indore', path: '/stem-lab-setup-schools-indore' },
  { name: 'School STEM Programme in Indore', path: '/school-stem-programme-indore' },
  { name: 'Workshop Enquiry & Contact', path: '/contact' },
];
