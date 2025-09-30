import { Controller, Get, Post, Body, Req, UseGuards, UnauthorizedException, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }
  @Get(':name')
  async getByName(@Param('name') name: string) {
    return await this.categoriesService.findByName(name);
  }
  @Post()
  @UseGuards()
  async createCategory(@Body() data: { name: string}) {
    return await this.categoriesService.createCategory(data);
  }

}
