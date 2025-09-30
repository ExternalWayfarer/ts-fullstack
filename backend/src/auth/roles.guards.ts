import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {SetMetadata} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export enum Role {
  CLIENT = "CLIENT",
  REPRESENTATIVE = "REPRESENTATIVE",
  OWNER =  "OWNER",
  MODERATOR =  "MODERATOR",
  ADMIN = "ADMIN",
}
//metadata 'roles' = 'ADmIN '
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
  //reflector for reading metadata
  constructor(private reflector: Reflector) {}
  //execution context - what method (getHandler) was called, what controller(getClass) called
  canActivate(context: ExecutionContext): boolean {
    //get all and override - choose right (method overrides teh controller)
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()]);
    console.log('roles', requiredRoles);
    const { user } = context.switchToHttp().getRequest();
    if (!requiredRoles) {
      return true;
    }
    return requiredRoles.some(roles => user && user.role.includes(roles));

  }
}