import { schema, rules } from '@ioc:Adonis/Core/Validator';
import Validator from 'app/modules/_shared/validator';

export class RecurrentPaymentPendingVal extends Validator {
  public schema = schema.create({
    payments: schema.array().members(
      schema.object().members({
        recurrent_payment_child_id: schema.string({}, [
          rules.exists({
            table: 'recurrent_payment_children',
            column: 'id',
          }),
        ]),
        students: schema.array().members(
          schema.object().members({
            student_id: schema.string({}, [
              rules.exists({
                table: 'students',
                column: 'id',
              }),
            ]),
            grade_id: schema.string({}, [
              rules.exists({
                table: 'grades',
                column: 'id',
              }),
            ]),
          })
        ),
      })
    ),
  });
}
