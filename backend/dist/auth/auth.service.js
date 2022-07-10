"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const { attachCookieToResponse, createTokenUser, removeCookie, } = require('../utils/jwt');
let AuthService = class AuthService {
    constructor(repo) {
        this.repo = repo;
    }
    async register(response, userDto) {
        const users = await this.repo.findBy({ email: userDto.email });
        if (users.length) {
            throw new common_1.BadRequestException('Email is already in use');
        }
        const { password } = userDto;
        try {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(password, salt);
            userDto.password = hash;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
        const tokenUser = createTokenUser(userDto);
        attachCookieToResponse(response, tokenUser);
        const user = this.repo.create(userDto);
        return this.repo.save(user);
    }
    async login(response, { username, password }) {
        const user = await this.repo.findOneBy({ username });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const tokenUser = createTokenUser(user);
        attachCookieToResponse(response, tokenUser);
        return tokenUser;
    }
    logout(response) {
        return removeCookie(response);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map