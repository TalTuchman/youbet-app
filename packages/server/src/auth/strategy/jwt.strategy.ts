import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // <-- IMPORT ConfigService
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService, // <-- INJECT ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Use the get() method which guarantees a string
      secretOrKey: config.get<string>('JWT_SECRET'), // <-- CHANGE THIS LINE
    });
  }

  // ... (validate method remains the same)
  async validate(payload: { sub: number; email: string }) { /* ... */ }
}