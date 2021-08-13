export const rcqData = [
  {
    rcqs: [{ id: 'r1', average: 90 }],
    assert: {
      r1: 1,
    },
  },
  {
    rcqs: [
      { id: 'r1', average: 90 },
      { id: 'r2', average: 89 },
    ],
    assert: {
      r1: 1,
      r2: 2,
    },
  },
  {
    rcqs: [
      { id: 'r1', average: 90 },
      { id: 'r2', average: 89 },
      { id: 'r3', average: 89 },
    ],
    assert: {
      r1: 1,
      r2: 2,
      r3: 2,
    },
  },
  {
    rcqs: [
      { id: 'r1', average: 89 },
      { id: 'r2', average: 89 },
      { id: 'r3', average: 89 },
    ],
    assert: {
      r1: 1,
      r2: 1,
      r3: 1,
    },
  },
  {
    rcqs: [
      { id: 'r1', average: 89 },
      { id: 'r2', average: 90 },
      { id: 'r3', average: 90 },
    ],
    assert: {
      r1: 3,
      r2: 1,
      r3: 1,
    },
  },
  {
    rcqs: [
      { id: 'r1', average: 89 },
      { id: 'r2', average: 90 },
      { id: 'r3', average: 90 },
      { id: 'r4', average: 88 },
      { id: 'r5', average: 88 },
      { id: 'r6', average: 87 },
    ],
    assert: {
      r1: 3,
      r2: 1,
      r3: 1,
      r4: 4,
      r5: 4,
      r6: 6,
    },
  },
];
