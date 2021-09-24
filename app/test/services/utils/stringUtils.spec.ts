import { timeValidationRule } from 'app/services/utils/stringUtils';
import { expect } from 'chai';
import test from 'japa';

test.group('stringUtils', () => {
  test('timeRule passes', () => {
    expect('12:00 am'.search(new RegExp(timeValidationRule))).to.be.greaterThan(
      -1
    );
    expect('01:00 am'.search(new RegExp(timeValidationRule))).to.be.greaterThan(
      -1
    );
    expect('12:59 pm'.search(new RegExp(timeValidationRule))).to.be.greaterThan(
      -1
    );
    expect('10:59 am'.search(new RegExp(timeValidationRule))).to.be.greaterThan(
      -1
    );
    expect('11:59 am'.search(new RegExp(timeValidationRule))).to.be.greaterThan(
      -1
    );
    expect('05:00 am'.search(new RegExp(timeValidationRule))).to.be.greaterThan(
      -1
    );
    expect('10:30 pm'.search(new RegExp(timeValidationRule))).to.be.greaterThan(
      -1
    );
  });

  test('timeRule fails', () => {
    expect('00:00 am'.search(timeValidationRule)).to.equal(-1);
    expect('1:00 am'.search(timeValidationRule)).to.equal(-1);
    expect('13:00 am'.search(timeValidationRule)).to.equal(-1);
    expect('01:60 am'.search(timeValidationRule)).to.equal(-1);
    expect('01:059 am'.search(timeValidationRule)).to.equal(-1);
    expect('13:00 pm'.search(timeValidationRule)).to.equal(-1);
  });
});
