import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { Role, Roles, RolesGuard } from '../auth/roles.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN, Role.MODERATOR)
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('test')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  async iWantItAll(@Req() req) {
    return req.user.role == Role.ADMIN;
  }

  @Post()
  async createUser(
    @Body() data: { name: string; email: string; password: string },
  ) {
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
    if (user.company) {
      return {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        role: user.role.toString(),
        company: {
          id: user.company.id.toString(),
          name: user.company.name,
          website: user.company.website,
          createdAt: user.company.createdAt.toString(),
        },
        createdAt: user.createdAt.toISOString(),
      };
    } else {
      return {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        role: user.role.toString(),
        createdAt: user.createdAt.toISOString(),
      };
    }
  }

  /*
  @Get(':id')
  async getById(@Param('id') id: string) {
    return
  }
  */
}