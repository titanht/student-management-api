import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { massSerialize } from 'app/services/utils';
import AcademicYearService from './academic/academicYear/academicYearService';
import Grade from './academic/grade/grade';
import Student from './academic/student/student';
import Payment, { Months, PaymentType } from './finance/payment/payment';

export default class TestController {
  async test({ request, response }: HttpContextContract) {
    const { grade_id: gradeId } = request.all();
    const students = await Student.query()
      .preload('gradeStudents', (gs) => {
        gs.where('grade_id', gradeId)
          .where('academic_year_id', '8f35936e-96ea-4fd9-9434-eeee090f0ad0')
          .preload('grade');
      })
      .whereHas('gradeStudents', (gsBuilder) => {
        gsBuilder
          .where('grade_id', gradeId)
          .where('academic_year_id', '8f35936e-96ea-4fd9-9434-eeee090f0ad0');
      })
      .whereDoesntHave('payments', (paymentBuilder) => {
        paymentBuilder
          .where('academic_year_id', '8f35936e-96ea-4fd9-9434-eeee090f0ad0')
          .where('payment_type', 'Registration');
      });

    const studentsMinimal = massSerialize(students).map(
      (stud) => `${stud.first_name} ${stud.father_name}`
    );

    response.json({ len: students.length, studentsMinimal, students });
  }

  async test2({ response }: HttpContextContract) {
    const year = await AcademicYearService.getActive();
    const grades = await Grade.all();
    const gradeMap = {};
    for (let i = 0; i < grades.length; i++) {
      const gradeId = grades[i].id;
      const students = await Student.query()
        .preload('gradeStudents', (gs) => {
          gs.where('grade_id', gradeId)
            .where('academic_year_id', year.id)
            .preload('grade');
        })
        .whereHas('gradeStudents', (gsBuilder) => {
          gsBuilder
            .where('grade_id', gradeId)
            .where('academic_year_id', year.id);
        })
        .whereDoesntHave('payments', (paymentBuilder) => {
          paymentBuilder
            .where('academic_year_id', year.id)
            .where('payment_type', 'Registration');
        })
        .orderBy('first_name');

      const studentsMinimal = massSerialize(students).map(
        (stud) => `${stud.first_name} ${stud.father_name}`
      );
      gradeMap[grades[i].name] = studentsMinimal;
    }

    return response.json(gradeMap);
  }

  async test3({ response }: HttpContextContract) {
    const grades = await Grade.all();
    const gradeMap = {};
    for (let i = 0; i < grades.length; i++) {
      const gradeId = grades[i].id;
      const students = await Student.query()
        .preload('gradeStudents', (gs) => {
          gs.where('grade_id', gradeId)
            .where('academic_year_id', '8f35936e-96ea-4fd9-9434-eeee090f0ad0')
            .preload('grade');
        })
        .whereHas('gradeStudents', (gsBuilder) => {
          gsBuilder
            .where('grade_id', gradeId)
            .where('academic_year_id', '8f35936e-96ea-4fd9-9434-eeee090f0ad0');
        })
        .whereHas('payments', (paymentBuilder) => {
          paymentBuilder
            .where('academic_year_id', '8f35936e-96ea-4fd9-9434-eeee090f0ad0')
            .where('payment_type', 'Registration');
        })
        .orderBy('first_name');

      const studentsMinimal = massSerialize(students).map(
        (stud) => `${stud.first_name} ${stud.father_name}`
      );
      gradeMap[grades[i].name] = studentsMinimal;
    }

    return response.json(gradeMap);
  }

  // async clearRegistration() {
  //   const yearId = (await AcademicYearService.getActive()).id;
  //   const payments = await Payment.query()
  //     .where('academic_year_id', yearId)
  //     .where('payment_type', PaymentType.Registration);
  //   console.log(payments.length);
  //   const paidMap = {};
  //   const deletables: string[] = [];
  //   payments.forEach(({ id, attachment, student_id }) => {
  //     const key = `${student_id}-${attachment}`;
  //     if (!paidMap[key]) {
  //       paidMap[key] = true;
  //     } else {
  //       deletables.push(id);
  //     }
  //   });

  //   // await Payment.query().whereIn('id', deletables).delete();
  //   console.log('Registration delete', deletables.length);
  // }

  // async clearFees() {
  //   const months = Object.values(Months);
  //   const yearId = (await AcademicYearService.getActive()).id;

  //   for (let i = 0; i < months.length; i++) {
  //     const month = months[i];
  //     const payments = await Payment.query()
  //       .whereHas('feePayment', (feeBuilder) => {
  //         feeBuilder.where('month', month);
  //       })
  //       .where('academic_year_id', yearId)
  //       .where('payment_type', PaymentType.Fee);

  //     const paidMap = {};
  //     const deletables: string[] = [];
  //     payments.forEach(({ id, attachment, student_id }) => {
  //       const key = `${student_id}-${attachment}`;
  //       if (!paidMap[key]) {
  //         paidMap[key] = true;
  //       } else {
  //         deletables.push(id);
  //       }
  //     });

  //     // await Payment.query().whereIn('id', deletables).delete();
  //     console.log('Fee delete', payments.length, month, deletables.length);
  //   }
  // }
}
