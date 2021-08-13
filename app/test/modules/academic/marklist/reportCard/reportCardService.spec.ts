import ReportCardService from 'app/modules/academic/marklist/reportCard/reportCardService';
import Model from 'app/modules/_shared/model';
import { Repo } from 'app/modules/_shared/repo';
import { expect } from 'chai';
import test from 'japa';
import { quarterCstSmlData } from '../../_data/quarterMark';
import { rcqData } from '../../_data/rcqData';

const rcService = new ReportCardService({} as Repo<Model>);

test('calculateRank', () => {
  rcqData.forEach((rcq) => {
    const rankData = rcService.calculateRank(rcq.rcqs);
    expect(rankData).to.deep.equal(rcq.assert);
  });
});

test.group('filtering', () => {
  test('filters empty evaluation', () => {
    const data = [
      { id: 1, evaluationMethods: [] },
      { id: 2, evaluationMethods: [{ id: 'em1' }] },
    ];
    const assertData = [{ id: 2, evaluationMethods: [{ id: 'em1' }] }];

    expect(rcService.filterEmptyEvaluation(data)).to.deep.equal(assertData);
  });

  test('filters empty sml', () => {
    const data = [
      { id: 1, evaluationMethods: [{ id: 'em1', smls: [] }] },
      {
        id: 4,
        evaluationMethods: [
          { id: 'em1', smls: [] },
          { id: 'em5', smls: [] },
        ],
      },
      {
        id: 2,
        evaluationMethods: [
          { id: 'em2', smls: [] },
          { id: 'em3', smls: [{ id: 'sml1' }] },
        ],
      },
      {
        id: 3,
        evaluationMethods: [{ id: 'em3', smls: [{ id: 'sml1' }] }],
      },
    ];
    const assertData = [
      {
        id: 2,
        evaluationMethods: [
          { id: 'em2', smls: [] },
          { id: 'em3', smls: [{ id: 'sml1' }] },
        ],
      },
      {
        id: 3,
        evaluationMethods: [{ id: 'em3', smls: [{ id: 'sml1' }] }],
      },
    ];

    expect(rcService.filterEmptySml(data)).to.deep.equal(assertData);
  });
});

test.group('addMarks', () => {
  test('returns 0', () => {
    let marks = rcService.addMarks([]);
    // no data
    expect(marks).to.equal(0);

    marks = rcService.addMarks([
      {
        evaluationMethods: [],
      },
    ]);
    // no eval methods
    expect(marks).to.equal(0);

    marks = rcService.addMarks([
      {
        evaluationMethods: [
          {
            smls: [],
          },
        ],
      },
    ]);
    // no smls
    expect(marks).to.equal(0);
    marks = rcService.addMarks([
      {
        evaluationMethods: [{ smls: [{ score: 0 }] }],
      },
    ]);
    // 0 score
    expect(marks).to.equal(0);
  });

  test('returns sum', () => {
    let marks = rcService.addMarks([
      {
        evaluationMethods: [{ smls: [{ score: 10 }] }],
      },
    ]);
    expect(marks).to.equal(10);
    marks = rcService.addMarks([
      {
        evaluationMethods: [{ smls: [{ score: 10 }, { score: 20 }] }],
      },
    ]);
    expect(marks).to.equal(10);
    marks = rcService.addMarks([
      {
        evaluationMethods: [
          { smls: [{ score: 10 }] },
          { smls: [{ score: 20 }] },
        ],
      },
    ]);
    expect(marks).to.equal(30);
    marks = rcService.addMarks([
      {
        evaluationMethods: [
          { smls: [{ score: 10 }] },
          { smls: [{ score: 20 }] },
        ],
      },
      {
        evaluationMethods: [{ smls: [{ score: 30 }] }],
      },
    ]);
    expect(marks).to.equal(60);
    marks = rcService.addMarks(quarterCstSmlData);
    expect(marks).to.equal(127);
  });
});
