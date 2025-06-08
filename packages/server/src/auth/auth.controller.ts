import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth') // All routes in this controller will start with /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup') // Creates a POST /auth/signup endpoint
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }
}
