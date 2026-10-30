// Real photographs from Builds Your Mind sessions (public/images/gallery).
// Shown on /gallery and in the home page strip. Add a photo: drop the file in
// that folder and add one line here.
const base = '/images/gallery/';

export const galleryCategories = ['All', 'Workshops', 'Schools', 'Colleges', 'Events', 'Partners', 'Labs', 'Products'];

const photos = [
  { file: 'classroom-circuit-lesson-school.webp', category: 'Schools', width: 1400, height: 1050, alt: "A Builds Your Mind educator explaining a circuit diagram to school students in a classroom" },
  { file: 'classroom-circuit-blackboard.webp', category: 'Schools', width: 1400, height: 1050, alt: "School students listening to a circuit lesson with a diagram on the blackboard" },
  { file: 'college-classroom-kits-on-desks.webp', category: 'Colleges', width: 1400, height: 1050, alt: "College students in a classroom with project kits stacked on the desks" },
  { file: 'seminar-hall-technical-briefing.webp', category: 'Colleges', width: 1400, height: 788, alt: "Technical briefing for students seated at desks in a seminar hall" },
  { file: 'college-workshop-session.webp', category: 'Colleges', width: 1400, height: 1050, alt: "College students seated in a lecture room during a workshop" },
  { file: 'lecture-hall-demonstration.webp', category: 'Colleges', width: 1400, height: 1050, alt: "Students attending a hands-on demonstration in a lecture hall" },
  { file: 'computer-lab-session-wide.webp', category: 'Colleges', width: 1400, height: 1052, alt: "Students and faculty at computers during a session in a college lab" },
  { file: 'computer-lab-session-ai.webp', category: 'Colleges', width: 1400, height: 1040, alt: "Students at computers during a Builds Your Mind session in a college lab" },
  { file: 'educator-kits-on-table.webp', category: 'Workshops', width: 1400, height: 788, alt: "A Builds Your Mind educator with kits and parts laid out on a table in front of a class" },
  { file: 'student-assembling-cardboard-kit.webp', category: 'Workshops', width: 788, height: 1400, alt: "A student assembling a cardboard project kit at a desk" },
  { file: 'students-assembling-kit-together.webp', category: 'Workshops', width: 788, height: 1400, alt: "Two students assembling a kit together at a table" },
  { file: 'students-building-with-glue-gun.webp', category: 'Workshops', width: 1400, height: 1050, alt: "Students building a project kit using a glue gun during a workshop" },
  { file: 'school-assembly-demonstration.webp', category: 'Schools', width: 1050, height: 1400, alt: "An educator demonstrating to school students seated on the floor of an assembly hall" },
  { file: 'school-assembly-students.webp', category: 'Schools', width: 1050, height: 1400, alt: "Rows of school students in uniform attending a STEM session" },
  { file: 'school-assembly-hall.webp', category: 'Schools', width: 1050, height: 1400, alt: "School assembly hall filled with students during a STEM session" },
  { file: 'school-students-listening.webp', category: 'Schools', width: 1050, height: 1400, alt: "School students listening attentively during a STEM session" },
  { file: 'school-3d-design-lab.webp', category: 'Schools', width: 1400, height: 1050, alt: "A school student designing a 3D model on a lab computer" },
  { file: 'students-at-3d-design-computer.webp', category: 'Schools', width: 1400, height: 1050, alt: "School students at a computer lab working on 3D design software" },
  { file: 'children-with-music-kits.webp', category: 'Products', width: 1050, height: 1400, alt: "Two children holding Builds Your Mind music kit boxes" },
  { file: 'auditorium-session-educator.webp', category: 'Workshops', width: 1050, height: 1400, alt: "An educator speaking to students in an auditorium" },
  { file: 'auditorium-educator-demo.webp', category: 'Workshops', width: 1050, height: 1400, alt: "An educator holding up a component while demonstrating to an auditorium of students" },
  { file: 'auditorium-q-and-a.webp', category: 'Workshops', width: 1050, height: 1400, alt: "An educator taking questions from students in an auditorium" },
  { file: 'university-computer-lab.webp', category: 'Colleges', width: 1400, height: 1045, alt: "A university computer lab session with students at their workstations" },
  { file: 'students-showing-completed-kits.webp', category: 'Workshops', width: 1400, height: 1050, alt: "Students and faculty showing completed project kits" },
  { file: 'students-and-faculty-with-kits.webp', category: 'Workshops', width: 1050, height: 1400, alt: "Students and faculty posing with their completed kits" },
  { file: 'team-with-completed-kits.webp', category: 'Workshops', width: 1050, height: 1400, alt: "A group of students holding their completed kits" },
  { file: 'engineering-students-with-kits.webp', category: 'Colleges', width: 1400, height: 1050, alt: "Engineering students holding completed workshop project kits in a classroom" },
  { file: 'certificate-handover.webp', category: 'Events', width: 1400, height: 1050, alt: "A certificate being handed over at the end of a workshop" },
  { file: 'team-with-gift-hampers.webp', category: 'Events', width: 1400, height: 1050, alt: "A team holding gift hampers after a session" },
  { file: 'team-photo-classroom.webp', category: 'Events', width: 1400, height: 1050, alt: "A group photo of the team in a classroom after a session" },
  { file: 'institute-leaders-visit.webp', category: 'Partners', width: 1400, height: 892, alt: "Builds Your Mind with institute leaders and faculty on a partner visit" },
  { file: 'institute-leaders-group.webp', category: 'Partners', width: 1400, height: 1050, alt: "Group photo with institute leaders and faculty" },
  { file: 'electrical-training-board.webp', category: 'Labs', width: 1400, height: 1050, alt: "An electrical control training board with contactors, switches and indicator lamps" },
  { file: '3d-printed-parts-lab.webp', category: 'Labs', width: 1400, height: 985, alt: "3D-printed parts laid out on a lab table next to a 3D printer" },
];

export const galleryPhotos = photos.map((p) => ({ ...p, src: base + p.file }));

// A mixed handful for the home page strip.
const homePicks = [
  'students-showing-completed-kits.webp',
  'school-assembly-hall.webp',
  'educator-kits-on-table.webp',
  'children-with-music-kits.webp',
  'university-computer-lab.webp',
  'school-3d-design-lab.webp',
];
export const homeGalleryPhotos = homePicks.map((f) => galleryPhotos.find((p) => p.file === f)).filter(Boolean);
