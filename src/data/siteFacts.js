// Credibility facts shown on the website.
//
// RULE: only put a number here when it can be supported from the business's
// own records. The old About page displayed "500+ schools", "100K+ students",
// "10+ years" and "50+ products" without a source. Those claims have been
// removed and replaced with facts that are true by definition of the current
// offering. If the client supplies verified figures, add them here and update
// the label so the source is clear.
//
// This file is the single source of truth for the stats band on the About page
// and the facts strip on the Home page. Do not hard-code these numbers again.

export const siteFacts = [
  {
    value: '5',
    label: 'Programme areas',
    detail: 'STEM, robotics, AI, IoT and coding',
  },
  {
    value: '4',
    label: 'Cities served',
    detail: 'Indore, Dewas, Ujjain and Dhar',
  },
  {
    value: '1–12',
    label: 'Class groups',
    detail: 'Primary to senior school, plus college',
  },
  {
    value: '100%',
    label: 'Hands-on sessions',
    detail: 'Students build and test in every session',
  },
];

// Verified statements used in copy. Keeping them here makes it easy to audit
// what the site claims. Do not add a statement that the business cannot
// support with a document, a photo or a signed permission.
export const credibilityPoints = [
  'Programmes are planned around the class groups an institution gives us.',
  'Sessions run at the institution, with its teachers involved.',
  'Case studies and photographs are published only with written permission.',
  'Kits are designed, manufactured and quality-tested by Harmono Pvt. Ltd.',
];
