import { Injectable } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { sign } from 'jsonwebtoken';
import { Payload } from '../types/payload';

@Injectable()
export class AuthService {
    constructor(private userService: UserService){}

    async signPayload(payload: Payload){
        return sign(payload, 'secretKey', {expiresIn: '7d'});
    }

    async validateUser(payload: Payload){
        return await this.userService.findByPayload(payload);
    }
}
