// Content for service pages P08-P12.
// Titles, meta descriptions, H1s, H2 headings and button text are verbatim
// from Builds_Your_Mind_Website_SEO_Sheet.xlsx -> "On-Page SEO" rows 9-13.
// Keywords placed come from the "Keyword Map" sheet, mapped to these pages only.
// No invented statistics, no invented partner names, no copied copy.
// Contact details used site-wide: buildsyourmind@gmail.com, Harmono Pvt. Ltd., Indore, India.
// The official phone / WhatsApp number lives in src/config/contact.js — import it, don't hard-code it.

const CONTACT = '/contact'; // P15 - Workshop Enquiry & Contact
const CASE_STUDIES = '/case-studies'; // P13 - Case Studies
const HOME = '/'; // P01

// Cities are listed ONLY where the client confirmed sessions actually happen.
// Client confirmation (19 Oct 2026): Indore, Dewas, Ujjain, Dhar.
export const servedCities = [
  {
    name: 'Indore',
    desc: 'Our base, with school and college sessions running all year.',
  },
  {
    name: 'Dewas',
    desc: 'School sessions planned around the local timetable.',
  },
  {
    name: 'Ujjain',
    desc: 'School sessions planned around the local timetable.',
  },
  {
    name: 'Dhar',
    desc: 'School sessions planned around the local timetable.',
  },
];

export const servicePages = {
  // ---------------------------------------------------------------- P08
  P08: {
    pageId: 'P08',
    path: '/stem-lab-setup-schools-indore',
    title: 'STEM Lab Setup for Schools in Indore | Builds Your Mind',
    description:
      'Plan a STEM lab for your school with Builds Your Mind. Lab planning, programme support and hands-on learning for students in Indore.',
    h1: 'STEM Lab Setup & Programme for Schools in Indore',
    badge: 'Lab Planning & Programme Support',
    intro: [
      'Builds Your Mind supports STEM lab setup for schools in Indore, from planning the space to running hands-on sessions in it. A lab should be used every week, not opened once.',
      'If you are planning a robotics lab for schools on your campus, tell us the space and the class groups you want it for. We will tell you what a workable plan looks like.',
    ],
    quickFacts: [
      { label: 'Class groups', value: 'Primary, middle and senior school' },
      { label: 'Planning', value: 'Agreed with your school' },
      { label: 'Format', value: 'On-site lab planning and programme support' },
      { label: 'Materials', value: 'Kits and equipment planned with you' },
      { label: 'Outcome', value: 'A lab used regularly, with a term-wise plan' },
      { label: 'Deliverable', value: 'A written plan agreed before ordering' },
    ],
    button: 'Discuss a STEM Lab',
    altAction: { label: 'Talk to our team', to: CONTACT },
    sections: [
      {
        heading: 'What to Think About Before Setting Up a Lab',
        body: 'A lab works when it fits the timetable and the teachers who will use it. Before we suggest a plan, we look at these points with you.',
        items: [
          'Which class groups will use the lab, and how often',
          'Whether sessions will be led by your teachers or by us',
          'What kits and equipment already exist on campus',
          'How materials are kept, reused and maintained between sessions',
          'Whether an ongoing programme will run inside the lab',
        ],
      },
      {
        heading: 'What We Support',
        body: 'As a STEM lab partner for schools, we work with your management and teachers rather than around them.',
        items: [
          'Planning the lab around your space and timetable',
          'Hands-on kit choices matched to each class group',
          'Activity plans for the sessions that run in the lab',
          'Support for the teachers who lead the sessions',
        ],
      },
      {
        heading: 'Ongoing Lab Programme',
        body: 'Setting up a STEM lab programme is the first step. The value comes from using it regularly, term after term.',
        items: [
          'A term-wise activity plan for each class group',
          'Sessions that build on what the previous session covered',
          'Teacher guidance so your staff can run sessions themselves',
          'A student showcase at the end of a term',
        ],
      },
    ],
    photoSpots: [
      {
        label: 'Real photo needed',
        detail:
          "A school STEM lab set up and actively used by students during a session. Use a photo from a real session with the school's permission. Do not use a stock image here.",
      },
    ],
    faqs: [
      {
        q: 'Do you provide the kits and equipment for the lab?',
        a: 'Kits and materials are planned around your class groups. What is included is agreed with you in writing before anything is ordered.',
      },
      {
        q: 'Can our own teachers run the sessions?',
        a: 'Yes. Teacher guidance is part of the programme support, so your staff can run the sessions themselves once the programme is going.',
      },
      {
        q: 'Do we need a dedicated room for a robotics lab for schools?',
        a: 'Not always. We plan around the space your school has — a dedicated room, a shared classroom or a corner of the library can all work.',
      },
      {
        q: 'How long does lab setup take?',
        a: 'It depends on the space, the kits and your timetable. We agree a schedule with you before anything begins.',
      },
      {
        q: 'How do we start?',
        a: 'Share your school details through the enquiry page. A programme advisor will get back to you to discuss the space and the class groups.',
      },
    ],
    // Sheet says P08 links to P04, P09, P11, P15.
    related: ['P04', 'P09', 'P11'],
    // Keywords from the Keyword Map mapped to P08.
    keywords: [
      'STEM Lab Setup for Schools in Indore',
      'STEM Lab Programme',
      'Robotics Lab for Schools',
      'STEM Lab Partner for Schools',
    ],
  },

  // ---------------------------------------------------------------- P09
  P09: {
    pageId: 'P09',
    path: '/school-stem-programme-indore',
    title: 'School STEM Programme in Indore | Builds Your Mind',
    description:
      'Structured STEM, robotics, AI, IoT and innovation programmes for schools in Indore. Start with a workshop and grow into an annual programme.',
    h1: 'School STEM Programme in Indore',
    badge: 'Structured Annual Programmes',
    intro: [
      'Builds Your Mind runs a school STEM programme in Indore for schools that want STEM education for schools in Indore to be hands-on all year, not just a one-off session.',
      'A structured STEM programme for schools keeps the same class groups building, testing and presenting across the academic year, with each term building on the last.',
    ],
    quickFacts: [
      { label: 'Class groups', value: 'Primary, middle and senior school' },
      { label: 'Duration', value: 'Academic year, term by term' },
      { label: 'Format', value: 'On-site sessions at your school' },
      { label: 'Planning', value: 'Proposal agreed with your school' },
      { label: 'Outcome', value: 'Student projects and a year-end showcase' },
      { label: 'Deliverable', value: 'Term-wise activity plan and year-end review' },
    ],
    button: 'Request a Programme Proposal',
    altAction: { label: 'See how a workshop works', to: '/stem-workshops-schools-indore' },
    sections: [
      {
        heading: 'Programme Areas',
        body: 'A school innovation programme in Indore can mix several of these areas across the year.',
        items: [
          'STEM builds with everyday materials and kit parts',
          'Innovation workshops for schools, where students pick their own problem',
          'An AI and robotics programme built around small working projects',
          'A STEM innovation programme for senior classes, with open tasks',
        ],
      },
      {
        heading: 'Middle School and Senior School',
        body: 'The same programme changes shape as the class group gets older.',
        items: [
          'Primary classes: guided builds with clear steps',
          'Middle school: longer builds with testing and fixing',
          'Senior school: robotics plus coding, with more student decisions',
        ],
      },
      {
        heading: 'Annual Programme Plan',
        body: 'A future skills programme for schools is planned in phases, so the timetable and the budget stay manageable.',
        items: [
          'Term 1: kick-off workshops and basic builds',
          'Term 2: projects that build on the first term',
          'Term 3: a student showcase, with parents invited',
          'Year-end review with your coordinator to plan the next year',
        ],
      },
      {
        heading: 'Student Projects',
        body: 'By the end of the year, students have made things they can show, not only things they have read about.',
        items: [
          'A robot built and programmed by a group',
          'A sensor-based fix for a small school problem',
          'A coded project that automates something simple',
        ],
      },
    ],
    photoSpots: [
      {
        label: 'Real photo needed',
        detail:
          "Students from a school in Indore presenting a project built during the programme. Use a real photo with the school's permission. Do not use a stock image here.",
      },
    ],
    faqs: [
      {
        q: 'Do you run programmes only in Indore?',
        a: 'Sessions are planned around Indore, and we also plan workshops in nearby towns when the timetable allows. Tell us where your school is on the enquiry page and we will confirm.',
      },
      {
        q: 'How many students can join a programme?',
        a: 'We plan group sizes with your school. Each class group gets hands-on time, which usually means smaller batches at a time.',
      },
      {
        q: 'What is the difference between a workshop and a programme?',
        a: 'A workshop is a single session. A programme is a sequence of sessions across the year, where each session builds on the one before it.',
      },
      {
        q: 'Can our teachers run the sessions later on?',
        a: 'Yes. Teacher guidance is part of the programme, so your staff can continue the sessions without depending on us.',
      },
      {
        q: 'How do we request a proposal?',
        a: 'Send your school details on the enquiry page. A programme advisor will share a proposal matched to your class groups and timetable.',
      },
    ],
    // Sheet says P09 links to P03, P04, P08, P11, P15.
    related: ['P03', 'P04', 'P08', 'P11'],
    keywords: [
      'STEM Education for Schools in Indore',
      'School STEM Programme in Indore',
      'School Innovation Programme in Indore',
      'Innovation Workshops for Schools',
      'Future Skills Programme for Schools',
      'AI and Robotics Programme',
      'STEM Innovation Programme',
      'STEM Programme for Schools',
    ],
  },

  // ---------------------------------------------------------------- P10
  P10: {
    pageId: 'P10',
    path: '/college-university-workshops-indore',
    title: 'College & University Tech Workshops in Indore',
    description:
      'Technology workshops for colleges and universities in Indore. Robotics, AI, IoT, coding and innovation sessions for students and departments.',
    h1: 'College & University Technology Workshops in Indore',
    badge: 'For Departments & HODs',
    intro: [
      'Builds Your Mind runs technology workshops for colleges and universities in Indore. Sessions cover robotics, AI, IoT and coding, and are planned with the department.',
      'These sessions are practical from the start — students build, test and take apart working examples rather than watching slides. If your department is planning college technology workshops in Indore, or STEM workshops for colleges across the term, tell us the subjects and the years you want them for.',
    ],
    quickFacts: [
      { label: 'Audience', value: 'College and university students' },
      { label: 'Duration', value: 'Agreed with the department' },
      { label: 'Format', value: 'On-campus, hands-on sessions' },
      { label: 'Batch size', value: 'Agreed with the department' },
      { label: 'Topics', value: 'Robotics, AI, IoT and coding' },
      { label: 'Outcome', value: 'Hands-on build and testing' },
    ],
    button: 'Plan a Workshop for Your Department',
    altAction: { label: 'See what schools ask us', to: '/stem-partnership-mou' },
    sections: [
      {
        heading: 'Topics Offered',
        body: 'Depth is chosen by the department before the session, so a STEM programme for colleges matches the year and the subject.',
        items: [
          'Robotics and automation, from first principles to a working build',
          'Internet of Things: sensors, data and small connected devices',
          'Applied AI tools, and where they get things wrong',
          'Coding for students who build but have not written code before',
        ],
      },
      {
        heading: 'Workshop Format',
        body: 'Sessions run on campus around your academic calendar.',
        items: [
          'Planned with the department around the timetable',
          'Hands-on sessions, not lecture-style',
          'Batches small enough that every group gets support',
          'The department chooses the depth of each topic',
        ],
      },
      {
        heading: 'For Departments and HODs',
        body: 'Sessions can be a single event or a series across the term. We plan the content with the faculty, not around them.',
        items: [
          'Share the topics and the years your students need',
          'We propose session plans that fit the timetable',
          'Sessions run on campus, on dates you choose',
          'Department feedback shapes the next session',
        ],
      },
      {
        heading: 'Past Workshops',
        body: 'We publish an institution name and photos only when that institution has given written permission. Ask us for references relevant to your subject and class years.',
        photoSlots: 2,
      },
    ],
    photoSpots: [
      {
        label: 'Real photo needed',
        detail:
          'Students from a college or university department during a workshop. Use a real photo with the department’s permission. Do not use a stock image here.',
      },
      {
        label: 'Second real photo needed',
        detail:
          'A group project built during a college session, shown at the end of the workshop. Use a real photo with the department’s permission. Do not use a stock image here.',
      },
    ],
    faqs: [
      {
        q: 'Who runs the sessions?',
        a: 'Our trainers run the sessions, with faculty from the department joining as they wish. We plan together before the first session.',
      },
      {
        q: 'What is the batch size?',
        a: 'We agree batch sizes with the department, so every group gets hands-on support.',
      },
      {
        q: 'Do you run sessions for one department or several together?',
        a: 'Both. We plan with whichever department is coordinating, then adjust the topics for the years and subjects covered.',
      },
      {
        q: 'Can students take part who have never coded or built before?',
        a: 'Yes. Each topic starts from the basics, and the depth is decided by the department in advance.',
      },
      {
        q: 'How do we confirm a date?',
        a: 'Share the department details and the dates you have in mind on the enquiry page. A programme advisor will get back to you.',
      },
    ],
    // Sheet says P10 links to P13, P11, P15.
    related: ['P13', 'P11'],
    keywords: [
      'College Technology Workshops Indore',
      'University Technology Workshops Indore',
      'STEM Workshops for Colleges',
      'STEM Programme for Colleges',
    ],
  },

  // ---------------------------------------------------------------- P11
  P11: {
    pageId: 'P11',
    path: '/stem-partnership-mou',
    title: 'STEM Partnership & MOU for Schools | Builds Your Mind',
    description:
      'Explore a long-term STEM partnership or MOU with Builds Your Mind. We start with a workshop and plan a programme around your academic goals.',
    h1: 'STEM Partnership & MOU for Schools and Institutions',
    badge: 'Long-Term Partnerships',
    intro: [
      'Builds Your Mind works with schools and institutions as a technology partnership for schools that lasts, not a one-off visit. A typical STEM school partnership begins with a workshop day and grows into a full STEM education partnership for schools across the academic year.',
      'If your management is thinking about an innovation partnership for schools, ask us what a school technology partner Indore arrangement usually looks like and what kind of commitment is realistic.',
    ],
    button: 'Discuss a Partnership',
    altAction: { label: 'See how programmes work', to: '/school-stem-programme-indore' },
    sections: [
      {
        heading: 'How a Partnership Works',
        body: 'We plan in stages, so your school can stop or adjust at any point.',
        items: [
          'A first conversation with your coordinator or management',
          'A workshop day on your campus, to see whether the approach fits your students',
          'A programme proposal with class groups, kit requirements and dates',
          'A written agreement when both sides are ready',
        ],
      },
      {
        heading: 'Workshop to Programme to MOU',
        body: 'This is the usual path for a robotics school partnership, and for any other long-term arrangement with us.',
        items: [
          'Workshop: one session, no long-term commitment',
          'Programme: a term or a year, planned around your academic calendar',
          'A STEM education MOU: a multi-year agreement covering programmes, kits and support',
          'A school STEM MOU review: an annual checkpoint with your school to adjust the plan',
        ],
      },
      {
        heading: 'What Management Should Ask',
        body: 'These are fair questions to ask any school technology partner, including us.',
        items: [
          'Who runs the sessions — your teachers or ours?',
          'What is included in the kits, and who pays for replacement parts?',
          'Is there a written commitment, or is it session by session?',
          'What happens if the school wants to pause or stop?',
        ],
      },
      {
        heading: 'Named With Permission',
        body: 'We publish an institution or partner name on this page only when that institution has given written permission for it to be named. This section is therefore left unpublished for now. For references, ask our programme team about a robotics MOU for schools or any other arrangement you are considering.',
        photoSlots: 1,
      },
    ],
    photoSpots: [
      {
        label: 'Real photo needed',
        detail:
          "A partnership agreement being signed, or our team together with teachers at a school event. Use a real photo with the school's permission. Do not use a stock image here.",
      },
    ],
    faqs: [
      {
        q: 'Do you sign an MOU with every school?',
        a: 'No. An MOU makes sense when both sides want a multi-year arrangement. Schools can also work with us session by session.',
      },
      {
        q: 'What goes into a partnership agreement?',
        a: 'It depends on the institution. It usually covers the programmes, the kits and the support, and we put agreed commitments in writing before work starts.',
      },
      {
        q: 'Do you work with schools outside Indore?',
        a: 'Our school partnerships are planned from Indore, with sessions in nearby towns when the plan makes sense. Tell us where your institution is and we will confirm what we can offer as a STEM education partner in Indore.',
      },
      {
        q: 'Can our teachers be part of the partnership?',
        a: 'Yes. Teacher guidance is part of a long-term partnership, so your staff can run sessions themselves over time.',
      },
      {
        q: 'How do we start a conversation?',
        a: 'Send your institution details through the enquiry page. A programme advisor will get back to you to discuss a partnership that fits your school.',
      },
    ],
    // Sheet says P11 links to P09, P08, P13, P15.
    related: ['P09', 'P08', 'P13'],
    keywords: [
      'STEM Education Partnership for Schools',
      'STEM School Partnership',
      'Robotics School Partnership',
      'STEM Education MOU',
      'School STEM MOU',
      'Robotics MOU for Schools',
      'Technology Partnership for Schools',
      'Innovation Partnership for Schools',
      'STEM Education Partner in Indore',
      'School Technology Partner Indore',
    ],
  },

  // ---------------------------------------------------------------- P12
  P12: {
    pageId: 'P12',
    path: '/stem-education-madhya-pradesh',
    title: 'STEM Education in Madhya Pradesh | Builds Your Mind',
    description:
      'Builds Your Mind brings hands-on STEM, robotics, AI and IoT learning to schools and colleges across Madhya Pradesh. Contact us to discuss.',
    h1: 'STEM Education for Schools & Colleges in Madhya Pradesh',
    badge: 'Schools & Colleges in Madhya Pradesh',
    intro: [
      'Builds Your Mind is a STEM education company in Madhya Pradesh working with schools and colleges on hands-on STEM, robotics, AI and IoT learning. Our office is in Indore, and we plan STEM workshop sessions with schools in the towns listed below.',
      'If you are looking for a STEM education partner in Madhya Pradesh who plans around your timetable rather than a fixed package — for a single STEM workshop or a longer programme — tell us where your institution is and what you would like to run.',
    ],
    button: 'Contact Us',
    altAction: { label: 'See what we offer in Indore', to: '/stem-workshops-schools-indore' },
    sections: [
      {
        heading: 'Cities We Work In',
        body: 'We name a city only when school and college sessions are actually running there. We plan STEM workshop sessions across Madhya Pradesh from these cities. If your city is not on the list, ask us — we will be honest about what is possible.',
        cities: servedCities,
      },
      {
        heading: 'What We Offer',
        body: 'The same hands-on approach runs across the state, planned around each institution.',
        items: [
          'Workshops in STEM, robotics, AI, IoT and coding',
          'Ongoing school programmes that run across the year',
          'STEM lab planning with hands-on kit plans',
          'Long-term partnership planning for schools that want more than a one-off visit',
        ],
      },
      {
        heading: 'How to Invite Us',
        body: 'Tell us where your school is and which class groups you want sessions for, and we will come back with a plan that fits your timetable.',
        items: [
          'Send your institution details through the enquiry page',
          'A programme advisor reads your enquiry and gets back to you',
          'We agree a date and a plan that works for your timetable',
        ],
      },
    ],
    photoSpots: [
      {
        label: 'Real photo needed',
        detail:
          "Students and our team together at a session outside Indore in Madhya Pradesh. Use a photo from a real session with the school's permission. Do not use a stock image here.",
      },
    ],
    faqs: [
      {
        q: 'Which cities in Madhya Pradesh do you work in?',
        a: 'Indore, Dewas, Ujjain and Dhar. This list stays limited to cities where sessions actually run, and it is updated as new programmes start.',
      },
      {
        q: 'My city is not on the list. Can you still come?',
        a: 'Ask us. We travel for workshops when the plan makes sense, and we will tell you honestly what is possible from our base in Indore.',
      },
      {
        q: 'Do you work with colleges as well as schools?',
        a: 'Yes. Sessions are planned for schools and colleges separately, with the content matched to the age group and the subject.',
      },
      {
        q: 'How do we plan a session with you?',
        a: 'Send your institution details through the enquiry page. A programme advisor will get back to you to plan the session.',
      },
      {
        q: 'Is there anything extra for locations outside Indore?',
        a: 'Travel for locations outside Indore is discussed and agreed before you commit, so there are no surprises later.',
      },
    ],
    // Sheet says P12 links to P01, P03, P09, P15.
    related: [HOME],
    keywords: [
      'STEM Education Company in Madhya Pradesh',
      'STEM Workshop Madhya Pradesh',
      'STEM Education Partner Madhya Pradesh',
    ],
  },
};

export const serviceContact = CONTACT;
export const serviceCaseStudies = CASE_STUDIES;
export const serviceOrder = ['P08', 'P09', 'P10', 'P11', 'P12'];
