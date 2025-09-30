import { Controller, Get, Post, Body, Req, UseGuards, UnauthorizedException, Param } from '@nestjs/common';
import { CompaniesService } from './companies.service';


@Controller('companies')
export class CompaniesController {
  constructor(private readonly companyService: CompaniesService) {}

  @Get()
  async getAllCompanies() {
    return this.companyService.getAllCompanies();
  }
  @Get(':name')
  async getByName(@Param('name') name: string) {
    return await this.companyService.findByName(name);
  }
  @Post()
  async createCompany(@Body() data: { name: string}) {
    return await this.companyService.createCompany(data);
  }

}
