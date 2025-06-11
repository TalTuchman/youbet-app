import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

// Read the secret at the top level.
const jwtSecret = process.env.JWT_SECRET;

// Fail-fast guard clause.
// If the JWT_SECRET is not defined in the .env file, the entire application will fail to start.
// This is better than failing at runtime when a user tries to log in.
if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // We no longer need to inject ConfigService.
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Pass the guaranteed-to-exist constant.
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    
    // As decided, return the full user object.
    // NestJS will attach this to the request (req.user).
    return user;
  }
}