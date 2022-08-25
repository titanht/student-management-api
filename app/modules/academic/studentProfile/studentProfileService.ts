import Application from '@ioc:Adonis/Core/Application';
import { v4 } from 'uuid';
import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Service from 'app/modules/_shared/service';
import StudentProfile from './studentProfile';
import StudentProfileRepo from './studentProfileRepo';

export default class StudentProfileService extends Service<StudentProfile> {
  constructor() {
    super(new StudentProfileRepo());
  }

  async create(
    createData: Partial<StudentProfile>,
    _auth?: AuthContract | undefined
  ): Promise<StudentProfile> {
    const parentPhoto = createData.parent_photo;

    let imgName = '';

    if (parentPhoto) {
      imgName = `${v4()}-${(parentPhoto as any)?.data?.clientName}`;
      await (parentPhoto as any).move(Application.publicPath('images'), {
        name: imgName,
      });
    }

    return super.create({ ...createData, parent_photo: imgName || null });
  }

  async update(id: string, editData: Partial<StudentProfile>): Promise<any> {
    const parentImg = editData.parent_photo;

    if (parentImg) {
      const imgName = `${v4()}-${(parentImg as any)?.data?.clientName}`;
      await (parentImg as any).move(Application.publicPath('images'), {
        name: imgName,
      });
      editData.parent_photo = imgName;
    }

    return super.update(id, editData);
  }
}
