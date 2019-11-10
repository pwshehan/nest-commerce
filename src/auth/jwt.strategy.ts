import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Payload } from '../types/payload';

@Injectable()
export class JwtSrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey'
        })
    }

    async validate(payload: Payload, done: VerifiedCallback){
        const user = await this.authService.validateUser(payload);
        if (!user) {
            return done(
                new HttpException('Unautherized access', HttpStatus.UNAUTHORIZED), 
                false
            );
        }

        return done(null, user, payload.iat);
    }
}