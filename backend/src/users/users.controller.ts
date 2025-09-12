import { Controller, Get, Post, Body, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }


  @Post()
  async createUser(@Body() data: { name: string; email: string, password: string }) {
    return await this.usersService.createUser(data);
  }


  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getMe(@Req() req) {
    const userMail = req.user.email;
    const user = await this.usersService.findByEmail(userMail);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      role: user.role.toString(),
      createdAt: user.createdAt.toISOString(),
    };
  }
}