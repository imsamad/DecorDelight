import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { uploadAsset } from '../controllers/assetCtrl';

const assetRouter: Router = Router();

assetRouter.post('/', requireAuth, uploadAsset);

export { assetRouter };
