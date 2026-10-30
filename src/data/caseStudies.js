/**
 * Case Studies Data Store (/case-studies and /case-studies/:slug)
 *
 * Real institutional workshops completed in Indore.
 * Published strictly with written permission.
 * No fake stats, no stock imagery, no invented testimonials.
 */

export const filterCategories = [
  'All',
  'College / University',
  'Schools',
  'Robotics',
  'AI & Coding',
  'IoT',
  'STEM Science',
];

export const caseStudyTemplate = {
  slug: '',
  title: '',
  institution: '',
  city: 'Indore',
  classGroup: 'College / University', // Class 1-3, 4-5, 6-8, 9-10, 11-12, College / University
  workshopType: 'Robotics', // Robotics | AI & Coding | IoT | STEM Science
  date: '',
  studentsApprox: '',
  engagementFormat: 'One-time Intensive', // One-time Intensive | Annual Programme
  summary: '',
  coverPhoto: '',
  coverPhotoAlt: '',
  whatWeDid: '',
  whatStudentsBuilt: [],
  photos: [],
  video: {
    youtubeUrl: '',
    videoUrl: '',
    title: '',
  },
  observedOutcome: '',
  feedbackQuote: {
    text: '',
    author: '',
    role: '',
  },
  permissionConfirmedBy: '',
  permissionDate: '',
  permissionGranted: true,
  tags: [],
};

export const caseStudies = [
  {
    slug: 'sage-university-robotics-workshop-indore',
    title: 'Robotics & Applied Technology Workshop at SAGE University, Indore',
    institution: 'SAGE University',
    city: 'Indore',
    classGroup: 'College / University',
    studentsApprox: '65+',
    workshopType: 'Robotics',
    date: 'October 2026',
    engagementFormat: 'One-time Intensive',
    summary:
      'A practical hands-on technology and robotics workshop for computer science and engineering students at SAGE University, Indore, focusing on hardware circuits and embedded systems.',
    coverPhoto: '/images/case-studies/55caa40a-064a-4ecd-afff-c19ddbe99632.webp',
    coverPhotoAlt: 'MCA and computer science students in laboratory session at SAGE University, Indore',
    whatWeDid:
      'Conducted a comprehensive hands-on robotics and hardware interfacing workshop at SAGE University, Indore. The programme commenced with technical briefings on embedded architectures in the seminar hall, followed by lab-based sessions where students assembled microcontroller circuits, wired sensor arrays, and debugged firmware.',
    whatStudentsBuilt: [
      'Microcontroller-based embedded hardware interface with sensor telemetry',
      'Autonomous obstacle-avoiding mobile robot powered by ultrasonic distance sensing',
      'Dual infrared line-following robotic platform with calibrated surface reflectivity thresholds',
      'PWM motor control circuits with integrated H-bridge driver modules',
    ],
    photos: [
      {
        src: '/images/case-studies/55caa40a-064a-4ecd-afff-c19ddbe99632.webp',
        caption: 'MCA and computer science laboratory session: students working on hardware interfacing at SAGE University, Indore',
        alt: 'Computer lab workshop session at SAGE University, Indore',
        approvedFace: true,
      },
      {
        src: '/images/case-studies/img_8085.webp',
        caption: 'Faculty coordinator and engineering students showcasing completed Builds Your Mind technology project kits at SAGE University, Indore',
        alt: 'SAGE University faculty coordinator and students holding projects',
        approvedFace: true,
      },
      {
        src: '/images/case-studies/img_3703.webp',
        caption: 'Technical briefing and interactive embedded systems curriculum session in SAGE University seminar hall',
        alt: 'Technical briefing in seminar room at SAGE University',
        approvedFace: true,
      },
      {
        src: '/images/case-studies/img_2943.webp',
        caption: 'Engineering student teams holding their completed workshop project hardware in classroom',
        alt: 'Engineering students with completed project kits',
        approvedFace: true,
      },
      {
        src: '/images/case-studies/img_9129.webp',
        caption: 'Interactive presentation and firmware demonstration in the university lecture hall',
        alt: 'Lecture hall session at SAGE University',
        approvedFace: true,
      },
      {
        src: '/images/case-studies/sage-university-computer-lab.webp',
        caption: 'Interactive laboratory demonstration: students working with hardware boards and computer interfaces',
        alt: 'Computer lab workshop session at SAGE University',
        approvedFace: true,
      },
    ],
    video: {
      youtubeUrl: '',
      videoUrl: '',
      title: '',
    },
    videos: [],
    observedOutcome:
      'Student groups successfully wired, assembled, and verified their circuits during the allocated lab hours, testing autonomous navigation on indoor test tracks.',
    feedbackQuote: {
      text: 'The session was structured with immediate hands-on practice. Students assembled and debugged working hardware instead of only observing theoretical slides.',
      author: 'Department Coordinator',
      role: 'SAGE University, Indore',
    },
    permissionConfirmedBy: 'Department Coordinator',
    permissionDate: 'October 2026',
    permissionGranted: true,
    tags: ['College / University', 'Robotics', 'AI & Coding', 'IoT'],
  },
  {
    slug: 'takshila-school-3d-printing-workshop-indore',
    title: '3D Printing & Hands-on STEM Workshop at Takshila School, Indore',
    institution: 'Takshila School',
    city: 'Indore',
    classGroup: 'Class 6-8',
    studentsApprox: '80+',
    workshopType: 'STEM Science',
    date: 'September 2026',
    engagementFormat: 'Annual Programme',
    summary:
      'An engaging hands-on 3D printing and digital fabrication workshop at Takshila School, Indore, demonstrating CAD modeling, slicing, and physical additive manufacturing.',
    coverPhoto: '/images/case-studies/img_2699.webp',
    coverPhotoAlt: 'Interactive classroom workshop with circuit diagram on blackboard by Harmono Pvt Ltd (Builds Your Mind)',
    whatWeDid:
      'Delivered practical hands-on 3D printing and STEM engineering modules for middle school students at Takshila School, Indore. Students learned rapid prototyping principles, watched live 3D printing of mechanical parts, and assembled physical robotics mechanisms using educational kits.',
    whatStudentsBuilt: [
      'Custom 3D-modeled mechanical gears and linkages designed for additive manufacturing',
      'Dual-axis solar tracking demonstrator using light sensors and servo actuators',
      'Hydraulic robotic arm mechanism illustrating Pascal’s law of fluid pressure',
      'Motorized walking robot with gear-reduction transmission mechanics',
    ],
    photos: [
      {
        src: '/images/case-studies/img_2699.webp',
        caption: 'Classroom curriculum briefing: Builds Your Mind educator illustrating circuit diagrams on blackboard',
        alt: 'Educator teaching classroom with circuit diagram on blackboard',
        approvedFace: true,
      },
      {
        src: '/images/case-studies/img_5259.webp',
        caption: 'Interactive school STEM orientation and practical technology briefing for students in the assembly hall',
        alt: 'Students seated in school assembly hall for STEM workshop',
        approvedFace: true,
      },
      {
        src: '/images/case-studies/takshila-school-3d-printing.webp',
        caption: 'Live 3D printing machine operation and model slicing demonstration at Takshila School, Indore',
        alt: '3D printing demonstration at Takshila School',
        approvedFace: true,
      },
      {
        src: '/images/case-studies/takshila-school-model-testing.webp',
        caption: 'Students evaluating and assembling 3D-printed physical mechanisms during workshop hours',
        alt: 'Students examining 3D printed models',
        approvedFace: true,
      },
      {
        src: '/images/case-studies/school-robotics-practical.webp',
        caption: 'Hands-on hardware testing and interactive mechanics activity in school classroom',
        alt: 'School robotics practical activity',
        approvedFace: true,
      },
    ],
    video: {
      youtubeUrl: '',
      videoUrl: '/videos/takshila-school-3d-printing.mp4',
      title: 'Takshila School 3D Printing & Innovation Workshop Video',
    },
    videos: [
      {
        id: 'takshila-v1',
        videoUrl: '/videos/takshila-school-3d-printing.mp4',
        title: 'Takshila School 3D Printing & Innovation Workshop Video',
        description: 'Demonstrating layer-by-layer 3D fabrication, nozzle temperatures, and filament extrusion to school students.',
        poster: '/images/video-posters/takshila-school-3d-printing.jpg',
        institution: 'Takshila School, Indore',
        category: 'Schools (Class 6-8)',
      },
      {
        id: 'takshila-v2',
        videoUrl: '/videos/takshila-3d-printing-part2.mp4',
        title: 'Takshila School 3D Printing Workshop, Part 2',
        description: 'Printing, removing and handling the finished 3D-printed models.',
        poster: '/images/video-posters/takshila-3d-printing-part2.jpg',
        institution: 'Takshila School, Indore',
        category: 'Schools (Class 6-8)',
      },
      {
        id: 'takshila-v3',
        videoUrl: '/videos/takshila-3d-printing-part3.mp4',
        title: 'Takshila School 3D Printing Workshop, Part 3',
        description: 'The printer at work and students with their printed pieces in the Builds Your Mind lab.',
        poster: '/images/video-posters/takshila-3d-printing-part3.jpg',
        institution: 'Takshila School, Indore',
        category: 'Schools (Class 6-8)',
      },
    ],
    observedOutcome:
      'Students actively operated the slicing software, observed layer-by-layer 3D fabrication, and assembled their working mechanisms with full participation.',
    feedbackQuote: {
      text: 'Seeing digital 3D models turn into real physical parts gave our students immense excitement and deep practical understanding.',
      author: 'Science Department Head',
      role: 'Takshila School, Indore',
    },
    permissionConfirmedBy: 'Principal & Science Department Head',
    permissionDate: 'September 2026',
    permissionGranted: true,
    tags: ['Schools', 'Robotics', 'STEM Science'],
  },
];

export const caseStudyButton = 'Invite Us to Your Institution';

export const caseStudyLinks = [
  { name: 'STEM Workshops for Schools in Indore', path: '/stem-workshops-schools-indore' },
  { name: 'Robotics Workshops for Schools in Indore', path: '/robotics-workshops-schools-indore' },
  { name: 'AI Workshops for Schools', path: '/ai-workshops-schools' },
  { name: 'IoT Workshops for Schools', path: '/iot-workshops-schools' },
  { name: 'College & University Tech Workshops', path: '/college-university-workshops-indore' },
  { name: 'School STEM Programme in Indore', path: '/school-stem-programme-indore' },
  { name: 'Workshop Enquiry & Quote', path: '/contact?type=quote' },
];

export function getPublishedCaseStudies() {
  return caseStudies.filter((cs) => cs.permissionGranted === true);
}

export function getCaseStudyBySlug(slug) {
  return caseStudies.find(
    (cs) => cs.slug === slug && cs.permissionGranted === true
  );
}

export function getAllVerifiedVideos() {
  const published = getPublishedCaseStudies();
  const list = [];
  published.forEach((cs) => {
    if (cs.videos && cs.videos.length > 0) {
      cs.videos.forEach((v) => list.push({ ...v, slug: cs.slug }));
    } else if (cs.video?.videoUrl || cs.video?.youtubeUrl) {
      list.push({
        id: cs.slug,
        videoUrl: cs.video.videoUrl,
        youtubeUrl: cs.video.youtubeUrl,
        title: cs.video.title || cs.title,
        description: cs.summary || cs.whatWeDid,
        poster: cs.coverPhoto,
        institution: cs.institution,
        category: cs.classGroup,
        slug: cs.slug,
      });
    }
  });
  return list;
}

export default caseStudies;
