import { Injectable } from '@nestjs/common';
import { PrismaClient, Category } from '@prisma/client';
//import * as bcrypt from 'bcrypt';

@Injectable()
export class CategoriesService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllCategories() {
    return this.prisma.category.findMany();
  }

  async createCategory(data: { name: string}): Promise<Category> {
    const { name } = data;
    return this.prisma.category.create({
      data: { name },
    });
  }
  async findByName(name: string) {
    return this.prisma.category.findUnique({
      where: { name },
    });
  }
}
