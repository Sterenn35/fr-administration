import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './role.entity';
import { UsersModule } from 'src/users/users.module';
import { AssociationsModule } from 'src/associations/associations.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AssociationsModule, UsersModule, TypeOrmModule.forFeature([Role])],
  providers: [RolesService],
  controllers: [RolesController]
})
export class RolesModule {}
