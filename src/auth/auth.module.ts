import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { configuration } from '../config/configuration';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AccessToken } from './entities/access_token.entity';
import { RefreshToken } from './entities/refresh_token.entity';
import { AccessTokenRepository } from './repositories/access_token.repository';
import { RefreshTokenRepository } from './repositories/refresh_token.repository';
import { PermissionRepository } from './repositories/permission.repository';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { Permission } from './entities/permissions.entity';
import { Role } from './entities/roles.entity';
import { RoleController } from './role.controller';
import { RoleRepository } from './repositories/role.repository';
import { RoleService } from './role.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: configuration().secret,
      signOptions: { expiresIn: '10d', algorithm: 'HS256' },
    }),
    TypeOrmModule.forFeature([AccessToken, RefreshToken, Permission, Role]),
  ],
  controllers: [AuthController, PermissionController, RoleController],
  providers: [
    AuthService,
    PermissionService,
    RoleService,
    LocalStrategy,
    JwtStrategy,
    AccessTokenRepository,
    RefreshTokenRepository,
    PermissionRepository,
    RoleRepository,
  ],
  exports: [AuthService],
})
export class AuthModule {}
