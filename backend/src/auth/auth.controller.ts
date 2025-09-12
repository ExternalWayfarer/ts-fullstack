// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }): Promise<{accessToken: string, refreshToken: string}> {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    return this.authService.login(user);
  }

  @Post('refresh')
  async refresh(@Body() refreshDto: { refreshToken: string }): Promise<{accessToken: string}> {
    return this.authService.refresh(refreshDto.refreshToken);
  }

  @Post('logout')
  async logout(@Body() logoutDto: { refreshToken: string }) {
    await this.authService.logout(logoutDto.refreshToken);
    return { message: 'Logged out successfully' };
  }
}