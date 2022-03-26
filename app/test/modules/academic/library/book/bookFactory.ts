import Factory from '@ioc:Adonis/Lucid/Factory';
import Book from 'app/modules/academic/library/book/book';
import { DateTime } from 'luxon';

export const BookFactory = Factory.define(Book, ({ faker }) => {
  return {
    title: faker.lorem.sentence(),
    code: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    author: faker.lorem.sentence(),
    genre: faker.lorem.sentence(),
    year: faker.date
      .recent()
      .toISOString()
      .substring(0, 10) as unknown as DateTime,
    quantity: faker.datatype.number({ min: 1, max: 10000 }),
    loaned_count: faker.datatype.number({ min: 1, max: 10000 }),
    remark: faker.lorem.sentence(),
  };
}).build();
