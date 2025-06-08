import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  // Import PrismaService so we can use it
  constructor(private prisma: PrismaService) {}

  async signup(dto: SignUpDto) {
    // 1. Generate a hash for the user's password
    const hash = await bcrypt.hash(dto.password, 10);

    try {
      // 2. Try to save the new user to the database
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          passwordHash: hash,
        },
      });

      // 3. Return the newly created user (without the password)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash, ...result } = user;
        return result;
      

    } catch (error) {
      // Handle database errors (e.g., unique constraint violation)
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') { // 'P2002' is Prisma's code for a unique constraint failed
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error; // Re-throw any other errors
    }
  }
}