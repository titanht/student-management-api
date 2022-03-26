import test from 'japa';
import SubjectRepo from 'app/modules/academic/marklist/subject/subjectRepo';
import { transact } from 'app/test/testUtils';
import { SubjectFactory } from './subjectFactory';
import { expect } from 'chai';

const subRepo = new SubjectRepo();

transact('SubRepo', () => {
  test('getSubjectRankMap', async () => {
    const sub = await SubjectFactory.create();
    const subMap = await subRepo.getSubjectRankMap();
    expect(subMap).to.deep.equal({
      [sub.subject]: sub.consider_for_rank ? 1 : 0,
    });
  });
});
