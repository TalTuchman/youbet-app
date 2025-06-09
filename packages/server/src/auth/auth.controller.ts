import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto'; // Import the Login Dto

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  // ADD THIS NEW LOGIN ENDPOINT
  @HttpCode(HttpStatus.OK) // Set the success status code to 200 OK
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}