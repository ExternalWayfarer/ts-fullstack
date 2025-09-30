import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module'
import { CompaniesModule} from './companies/companies.module';
import  {AuthModule} from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
  export class PrismaModule {}



@Module({
  imports: [PrismaModule, UsersModule, AuthModule, CompaniesModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}






