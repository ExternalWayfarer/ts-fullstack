import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';


// Route '/products'
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(@Query('search') search?: string) {

    return this.productsService.findAll();
  }
}
