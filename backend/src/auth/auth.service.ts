// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { password: userPassword, ...result } = user;
    return result;
  }


  async login(user: any) {
    const tokenCount = await this.prisma.refreshToken.count({
      where: {
        userId: user.id,
        expiresAt: { gt: new Date() }, //
      },
    });
    if (tokenCount >= 5) {
      //while (tokenCount > 5) {}
        const oldestToken = await this.prisma.refreshToken.findFirst({
          where: { userId: user.id, expiresAt: { gt: new Date() } },
          orderBy: { createdAt: 'asc' }, // old and cold
        });
        if (oldestToken) {
          await this.prisma.refreshToken.delete({
            where: { id: oldestToken.id },
          });
        }


    }

    const accessPayload = { email: user.email, sub: user.id, role: user.role };
    const refreshPayload = { email: user.email, sub: user.id, role: user.role };

    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: 'SECRET2222',
      expiresIn: '7d', // refresh token lives 7 days
    });

    // save token in db
    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return {
      accessToken: this.jwtService.sign(accessPayload, {secret: 'SECRET111', expiresIn: '1h' },),
      refreshToken: refreshToken
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: 'SECRET2222',
      });

      const tokenRecord = await this.prisma.refreshToken.findUnique({
        where: { token: refreshToken },
      });

      if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
        throw new UnauthorizedException('Invalid or expired refresh token');
      }

      const user = await this.usersService.findByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const accessPayload = { email: user.email, sub: user.id, role:user.role };
      return {
        accessToken: this.jwtService.sign(accessPayload, {
          secret: 'SECRET111',
          expiresIn: '1h',
        }),
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(refreshToken: string) {
    // delete refresh token on logout
    await this.prisma.refreshToken.delete({
      where: { token: refreshToken },
    });
  }
}