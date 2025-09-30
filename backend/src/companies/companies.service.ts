import { Injectable } from '@nestjs/common';
import { PrismaClient, Company } from '@prisma/client';
//import * as bcrypt from 'bcrypt';

@Injectable()
export class CompaniesService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllCompanies() {
    return this.prisma.company.findMany();
  }

  async createCompany(data: { name: string}): Promise<Company> {
    const { name } = data;
    return this.prisma.company.create({
      data: { name },
    });
  }
  async findByName(name: string) {
    return this.prisma.company.findUnique({
      where: { name },
    });
  }
}
