import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'app/modules/auth/user';
import LoginVal from './loginValidator';

export default class AuthController {
  public async login({ request, response, auth }: HttpContextContract) {
    await request.validate(LoginVal);

    const email = request.input('email');
    const password = request.input('password');

    try {
      const token = await auth.use('api').attempt(email, password);
      const userEmail = await User.findBy('email', email);
      let user;
      if (userEmail) {
        user = userEmail.serialize() as any;
      }

      user.token = token.toJSON()['token'];

      return { user };
    } catch (err) {
      console.log('auth err', err);
      return response
        .status(422)
        .json({ errors: { email: 'Invalid Credential' } });
    }
  }

  public async register({ request }: HttpContextContract) {
    /**
     * Validate user details
     */
    const validationSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      password: schema.string({ trim: true }, [rules.confirmed()]),
    });

    const userDetails = await request.validate({
      schema: validationSchema,
    });

    /**
     * Create a new user
     */
    const user = new User();
    user.email = userDetails.email;
    user.password = userDetails.password;
    await user.save();

    return 'Your account has been created';
  }

  public async whoAmI({ response, auth }: HttpContextContract) {
    return response.json({ user: auth.user });
  }

  public async logout({ auth, response }: HttpContextContract) {
    auth.logout();

    return response.json({ success: true });
  }
}
