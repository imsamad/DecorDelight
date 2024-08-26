import fs from 'fs';
const envFilePath =
  process.env.NODE_ENV == 'production'
    ? `/etc/secrets/.env`
    : `${process.cwd()}/.env`;

require('dotenv').config({
  path: envFilePath,
});

import 'express-async-errors';
import { server } from './server';
import { EUserRole } from '@repo/db';

if (process.env.NODE_ENV == 'development' && !fs.existsSync(envFilePath))
  process.exit(1);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`server running on ${port}`);
});

// ========================
// extends typings
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: EUserRole;
        email: string;
        username: string;
      };
    }
  }
}
