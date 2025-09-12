import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }
  async createUser(data: { name: string; email: string, password: string }): Promise<User> {
    const {password, name, email} = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {name, email, password: hashedPassword},
    });
  }
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
