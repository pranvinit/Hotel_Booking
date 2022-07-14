"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const cors = require('cors');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 5000;
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    app.use(cors());
    app.setGlobalPrefix('api/v1');
    app.use(cookieParser(process.env.SIGNED_COOKIE_SECRET));
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET,
    });
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map