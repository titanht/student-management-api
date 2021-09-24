import Application from '@ioc:Adonis/Core/Application';
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';

export const moveFileUpload = async (
  file: MultipartFileContract | null,
  fileName: string
) => {
  await file?.move(Application.tmpPath('uploads'), {
    name: fileName,
    overwrite: true,
  });
};

export const parseCsvContent = (fileData: string): Array<string[]> => {
  return fileData
    .split('\n')
    .slice(1)
    .filter((i) => i !== '')
    .map((i) => i.split(','));
};
