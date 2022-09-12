import User from 'app/modules/auth/user';

const UserService = {
  findNonTeachers: () => User.query().whereDoesntHave('teacher', (_) => {}),
};

export default UserService;
