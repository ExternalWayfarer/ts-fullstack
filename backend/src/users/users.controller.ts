import { Controller, Get, Post, Body  } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Controller('users')
export class UsersController{
constructor(private readonly prisma: PrismaService) {}

@Get() // Получить всех пользователей
async getAllUsers() {
return this.prisma.user.findMany();
}


@Post() // Добавить нового пользователя
async createUser(@Body() data: { name: string; email: string }) {
  return await this.prisma.user.create({ data });
}

}