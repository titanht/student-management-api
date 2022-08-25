import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import fs from 'fs';
import path from 'path';
import {
  pooledPromises,
  // transactLocalized
} from 'app/services/utils';
import Student from 'app/modules/academic/student/student';
import Model from 'app/modules/_shared/model';
import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database';
import _ from 'lodash';
import StudentProfile from 'app/modules/academic/studentProfile/studentProfile';
import { DateTime } from 'luxon';
// import AcademicYear from 'app/modules/academic/academicYear/academicYear';
import Payment, { PaymentType } from 'app/modules/finance/payment/payment';
import Registration from 'app/modules/finance/payment/registration/registration';
// import User from 'app/modules/auth/user';
import Tutorial from 'app/modules/finance/payment/tutorial/tutorial';
// import del from 'del';
import Fee from 'app/modules/finance/payment/fee/fee';

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'files', 'data')).toString()
);
const POOL_SIZE = 40;

const getDate = (d: string): unknown => {
  return d ? d.substring(0, 10) : null;
};
const logs: string[] = [];

export default class PaymentSeeder extends BaseSeeder {
  massSerialize(models: Model[]) {
    return models.map((model) => model.serialize());
  }

  async getStudents() {
    const studentIdMap = {};
    const students = this.massSerialize(await Student.all());
    students.forEach((student) => {
      studentIdMap[student.id_number] = student.id;
    });

    return { students, studentIdMap };
  }

  public async run() {
    // const { studentIdMap } = await this.getStudents();
    // const ay = (await AcademicYear.first()) as AcademicYear;
    // const user = (await User.first()) as User;
    // await transactLocalized(async (trx) => {
    //   await this.updateDOB(trx, studentIdMap);
    //   await this.createProfile(trx, studentIdMap);
    //   await this.seedRegistration(trx, studentIdMap, ay.id, user.id);
    //   await this.seedTutorial(trx, studentIdMap, ay.id, user.id);
    //   await this.seedFee(trx, studentIdMap, ay.id, user.id);
    // });
    // // fs.writeFileSync(
    // //   `${__dirname}/out.json`,
    // //   JSON.stringify(studentIdMap, null, 2)
    // // );
    // await del(`${__dirname}/skip.log`);
    // fs.writeFileSync(`${__dirname}/skip.log`, logs.join('\n'));
    // console.log('Done Payment Seed', Object.values(data).length);
  }

  async seedFee(
    trx: TransactionClientContract,
    studentIdMap: object,
    ayId: string,
    userId: string
  ) {
    console.log('Seed Fee');
    const promises: any[] = [];

    Object.keys(data).forEach((key) => {
      if (data[key].fees && !_.isEmpty(data[key].fees)) {
        const studId = studentIdMap[key];
        if (studId) {
          data[key].fees.forEach((feeData) => {
            promises.push(async () => {
              const {
                fee,
                attachment_number: attachment,
                fs_number: fs,
                cash,
                slip_date,
                remark,
                month,
                penalty,
                scholarship_amount: scholarship,
              } = feeData;

              const payment = await Payment.create(
                {
                  fee: fee / 100,
                  attachment,
                  fs,
                  cash: cash / 100,
                  slip_date: getDate(slip_date) as DateTime,
                  remark,
                  academic_year_id: ayId,
                  user_id: userId,
                  payment_type: PaymentType.Fee,
                  student_id: studId,
                },
                {
                  client: trx,
                }
              );
              await Fee.create(
                {
                  payment_id: payment.id,
                  month,
                  penalty: penalty / 100,
                  scholarship: scholarship / 100,
                },
                {
                  client: trx,
                }
              );
            });
          });
        } else {
          logs.push(`Skipping Fee for student ${key}`);
        }
      }
    });

    await pooledPromises(promises, POOL_SIZE);
  }

  async seedTutorial(
    trx: TransactionClientContract,
    studentIdMap: object,
    ayId: string,
    userId: string
  ) {
    console.log('Seed Tutorial');
    const promises: any[] = [];

    Object.keys(data).forEach((key) => {
      if (data[key].tutorials && !_.isEmpty(data[key].tutorials)) {
        const studId = studentIdMap[key];
        if (studId) {
          data[key].tutorials.forEach((tutorial) => {
            promises.push(async () => {
              const {
                fee,
                attachment_number: attachment,
                fs_number: fs,
                cash,
                slip_date,
                remark,
                month,
              } = tutorial;

              const payment = await Payment.create(
                {
                  fee: fee / 100,
                  attachment,
                  fs,
                  cash: cash / 100,
                  slip_date: getDate(slip_date) as DateTime,
                  remark,
                  academic_year_id: ayId,
                  user_id: userId,
                  payment_type: PaymentType.Tutorial,
                  student_id: studId,
                },
                {
                  client: trx,
                }
              );
              await Tutorial.create(
                {
                  payment_id: payment.id,
                  month,
                },
                {
                  client: trx,
                }
              );
            });
          });
        } else {
          logs.push(`Skipping TUtorial for student ${key}`);
        }
      }
    });

    await pooledPromises(promises, POOL_SIZE);
  }

  async seedRegistration(
    trx: TransactionClientContract,
    studentIdMap: object,
    ayId: string,
    userId: string
  ) {
    console.log('Seed Registration');
    const promises: any[] = [];

    Object.keys(data).forEach((key) => {
      if (data[key].registration && !_.isEmpty(data[key].registration)) {
        const studId = studentIdMap[key];
        if (studId) {
          promises.push(async () => {
            const {
              fee,
              attachment_number: attachment,
              fs_number: fs,
              cash,
              slip_date,
              remark,
            } = data[key].registration;

            const payment = await Payment.create(
              {
                fee: fee / 100,
                attachment,
                fs,
                cash: cash / 100,
                slip_date: getDate(slip_date) as DateTime,
                remark,
                academic_year_id: ayId,
                user_id: userId,
                payment_type: PaymentType.Registration,
                student_id: studId,
              },
              {
                client: trx,
              }
            );
            await Registration.create(
              {
                payment_id: payment.id,
              },
              {
                client: trx,
              }
            );
          });
        } else {
          logs.push(`Skipping Registration for student ${key}`);
        }
      }
    });

    await pooledPromises(promises, POOL_SIZE);
  }

  async updateDOB(trx: TransactionClientContract, studentIdMap: object) {
    console.log('Update DOB');
    const promises: any[] = [];

    Object.keys(data).forEach((key) => {
      if (data[key].profile && data[key].profile.date_of_birth) {
        const studId = studentIdMap[key];
        if (studId) {
          promises.push(async () => {
            const student = await Student.find(studId);
            if (student) {
              student.useTransaction(trx);
              // student.merge({
              //   date_of_birth: getDate(
              //     data[key].profile.date_of_birth
              //   ) as unknown as Date,
              // });
              await student.save();
            }
          });
        }
      }
    });

    await pooledPromises(promises, POOL_SIZE);
  }

  async createProfile(trx: TransactionClientContract, studentIdMap) {
    console.log('Seed Student Profile');
    const promises: any[] = [];

    Object.keys(data).forEach((key) => {
      if (data[key].profile && !_.isEmpty(data[key].profile)) {
        const studId = studentIdMap[key];
        if (studId) {
          promises.push(async () => {
            const {
              nationality,
              address_city,
              address_sub_city,
              address_woreda,
              house_number,
              student_phone_number,
              other_health_status,
              previous_school_name,
              previous_school_city,
              previous_school_sub_city,
              previous_school_woreda,
              school_leave_other,
              entry_class,
              parent_name,
              occupation,
              work_place,
              parent_phone_number,
              student_living_with,
              date_of_birth,
              student_photo,
              parent_photo,
              emergencies,
              health_status,
              father_condition,
              mother_condition,
              previous_school_leave_reason,
            } = data[key].profile;
            await StudentProfile.create(
              {
                student_id: studId,
                nationality: nationality || null,
                address_city: address_city || null,
                address_sub_city: address_sub_city || null,
                address_woreda: address_woreda || null,
                house_number: house_number || null,
                student_phone_number: student_phone_number || null,
                other_health_status: other_health_status || null,
                previous_school_name: previous_school_name || null,
                previous_school_city: previous_school_city || null,
                previous_school_sub_city: previous_school_sub_city || null,
                previous_school_woreda: previous_school_woreda || null,
                school_leave_other: school_leave_other || null,
                entry_class: entry_class || null,
                parent_name: parent_name || null,
                occupation: occupation || null,
                work_place: work_place || null,
                parent_phone_number: parent_phone_number || null,
                student_living_with: student_living_with || null,
                date_of_birth: getDate(date_of_birth) as DateTime,
                student_photo: student_photo || null,
                parent_photo: parent_photo || null,
                emergencies: emergencies || null,
                health_status: health_status || null,
                father_condition: father_condition || null,
                mother_condition: mother_condition || null,
                previous_school_leave_reason:
                  previous_school_leave_reason || null,
              },
              {
                client: trx,
              }
            );
          });
        }
      }
    });

    await pooledPromises(promises, POOL_SIZE);
  }
}
