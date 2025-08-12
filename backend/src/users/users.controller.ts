import { Controller, Get, Post, Body  } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController{
constructor(private readonly usersService: UsersService) {}

@Get()
async getAllUsers() {
return this.usersService.getAllUsers();
}


@Post()
async createUser(@Body() data: { name: string; email: string }) {
  return await this.usersService.createUser(data);
}

}