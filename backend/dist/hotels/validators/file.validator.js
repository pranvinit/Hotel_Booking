"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerOptions = void 0;
const multer_1 = require("multer");
const path = require('path');
exports.multerOptions = {
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
    storage: (0, multer_1.diskStorage)({
        destination: 'dist/uploads/',
        filename: (req, file, cb) => {
            cb(null, `${file.originalname.replace(' ', '_')}`);
        },
    }),
};
//# sourceMappingURL=file.validator.js.map