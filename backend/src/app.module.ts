import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module'
import  {AuthModule} from './auth/auth.module';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
  export class PrismaModule {}



@Module({
  imports: [PrismaModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}






