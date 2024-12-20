import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsersController } from './users/users.controller';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Делаем доступным для других модулей
})
  export class PrismaModule {}

@Module({
  imports: [PrismaModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}






