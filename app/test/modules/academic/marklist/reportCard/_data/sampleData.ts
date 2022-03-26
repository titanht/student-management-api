export const sampleRcqCstAssertData = {
  Amharic: {
    q1: 10,
    q2: 30,
  },
  English: {
    q1: 20,
    q2: 40,
  },
};

export const sampleRcqCst = [
  {
    score: 10,
    rcq: {
      quarter: 'q1',
    },
    cst: {
      subject: {
        subject: 'Amharic',
      },
    },
  },
  {
    score: 20,
    rcq: {
      quarter: 'q1',
    },
    cst: {
      subject: {
        subject: 'English',
      },
    },
  },
  {
    score: 30,
    rcq: {
      quarter: 'q2',
    },
    cst: {
      subject: {
        subject: 'Amharic',
      },
    },
  },
  {
    score: 40,
    rcq: {
      quarter: 'q2',
    },
    cst: {
      subject: {
        subject: 'English',
      },
    },
  },
];
