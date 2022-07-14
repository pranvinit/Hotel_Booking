import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
const path = require('path');

export const multerOptions = {
  limits: {
    fileSize: 1024 * 1024 * 5,
    files: 6,
  },
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname);

    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb(new Error('please upload an image'), false);
    }
    cb(null, true);
  },
  storage: diskStorage({
    destination: 'dist/uploads/',
    filename: (req, file, cb) => {
      cb(null, `${file.originalname.replace(' ', '_')}`);
    },
  }),
};
