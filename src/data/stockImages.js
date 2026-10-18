// Illustrative stock photographs (Pexels licence: free to use, no attribution
// required). Credits are kept in STOCK_IMAGES.md at the repo root.
// NOT used in case studies or testimonials. Swap for real photos when available.
const base = '/images/stock/';

export const stockImages = {
  P03: {
    file: 'stem-teacher-student-experiment.jpg',
    alt: 'A teacher and a young student doing a science experiment together at a whiteboard',
  },
  P04: {
    file: 'robotics-students-building.jpg',
    alt: 'Three students building and testing a small red robot together at a table',
  },
  P05: {
    file: 'ai-students-laptops-teacher.jpg',
    alt: 'Two students working on a laptop while a teacher looks on in a classroom',
  },
  P06: {
    file: 'iot-student-soldering-circuit.jpg',
    alt: 'A student soldering an electronic circuit board at a workbench',
  },
  P07: {
    file: 'coding-students-computers.jpg',
    alt: 'Students working at computers in a classroom',
  },
  P08: {
    file: 'lab-children-assembling-parts.jpg',
    alt: 'Children assembling parts of a project together at a table in a learning lab',
  },
  P09: {
    file: 'programme-teacher-robotics-class.jpg',
    alt: 'A teacher guiding students who are building red robots in a classroom',
  },
  P10: {
    file: 'college-computer-lab.jpg',
    alt: 'A student working at a computer in a college computer lab',
  },
  P11: {
    file: 'partnership-handshake-chalkboard.jpg',
    alt: 'A teacher and a student shaking hands in front of a chalkboard',
  },
  P12: {
    file: 'region-school-computer-room.jpg',
    alt: 'A classroom full of school students working at computers',
  },
};

export const stockImageFor = (pageId) => {
  const img = stockImages[pageId];
  return img ? { ...img, src: base + img.file, width: 1200, height: 800 } : null;
};
