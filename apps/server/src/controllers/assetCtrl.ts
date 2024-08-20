import { Request, Response } from 'express';
import { deleteFile, saveAssetLocally } from '../lib/saveLocally';
import { cloduinaryUploader } from '../lib/cloudinary';
import { CustomResponseError } from '@repo/utils';

export const uploadAsset = async (req: Request, res: Response) => {
  const filePath = await saveAssetLocally(req);

  if (filePath) {
    const url = await cloduinaryUploader(filePath);

    await deleteFile(filePath);

    return res.json({
      url,
    });
  } else
    throw new CustomResponseError(404, {
      message: 'Provide file',
    });
};
