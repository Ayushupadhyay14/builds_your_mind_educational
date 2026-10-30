// Real photographs from Builds Your Mind sessions (public/images/workshops).
// Keyed by page id; alt text describes what each photo shows.
const base = '/images/workshops/';

export const stockImages = {
  P03: {
    file: 'stem-workshop-classroom-kits.webp',
    alt: 'Students seated in a classroom with Builds Your Mind project kits stacked on the desks during a STEM workshop',
  },
  P04: {
    file: 'robotics-educator-kits-table.webp',
    alt: 'A Builds Your Mind educator with project kits and parts laid out on a table in front of a college class',
  },
  P05: {
    file: 'ai-workshop-computer-lab.webp',
    alt: 'Students and faculty at computers in a college lab during a Builds Your Mind AI session',
  },
  P06: {
    file: 'iot-electrical-control-board.webp',
    alt: 'An electrical control training board with contactors, switches and indicator lamps used for hands-on IoT and automation learning',
  },
  P07: {
    file: 'coding-workshop-computer-lab.webp',
    alt: 'Students working at computers in a college lab during a Builds Your Mind coding session',
  },
  P08: {
    file: 'stem-lab-students-3d-design.webp',
    alt: 'School students designing a 3D model on a lab computer during a STEM session',
  },
  P09: {
    file: 'school-programme-classroom.webp',
    alt: 'A Builds Your Mind educator explaining a circuit diagram on the blackboard to school students',
  },
  P10: {
    file: 'college-workshop-session.webp',
    alt: 'College students seated in a lecture room during a Builds Your Mind workshop',
  },
  P11: {
    file: 'partnership-institute-leaders.webp',
    alt: 'Builds Your Mind with institute leaders and faculty at an educational partner visit',
  },
  P12: {
    file: 'school-assembly-stem-session.webp',
    alt: 'A hall full of school students in uniform attending a Builds Your Mind STEM session in Madhya Pradesh',
  },
};

export const stockImageFor = (pageId) => {
  const img = stockImages[pageId];
  return img ? { ...img, src: base + img.file, width: 1200, height: 800 } : null;
};
