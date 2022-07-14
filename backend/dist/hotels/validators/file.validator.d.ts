/// <reference types="multer" />
export declare const multerOptions: {
    limits: {
        fileSize: number;
        files: number;
    };
    fileFilter(req: any, file: any, cb: any): any;
    storage: import("multer").StorageEngine;
};
