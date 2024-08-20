import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validateRequest';
import { AddressSchema, ObjectIdParamSchema } from '@repo/utils';
import {
  createAddress,
  deleteAddress,
  getMyAddress,
  getSingleAddress,
  updateAddress,
} from '../controllers/addressCtrl';

const addressRouter: Router = Router();

addressRouter.post(
  '/',
  requireAuth,
  validateRequest(AddressSchema, 'body'),
  createAddress
);

addressRouter.get('/', requireAuth, getMyAddress);

addressRouter.get(
  '/:addressId',
  requireAuth,
  validateRequest(ObjectIdParamSchema('addressId'), 'params'),
  getSingleAddress
);

addressRouter.put(
  '/:addressId',
  requireAuth,
  validateRequest(ObjectIdParamSchema('addressId'), 'params'),
  validateRequest(AddressSchema, 'body'),
  updateAddress
);

addressRouter.delete(
  '/:addressId',
  requireAuth,
  validateRequest(ObjectIdParamSchema('addressId'), 'params'),
  deleteAddress
);

export { addressRouter };
