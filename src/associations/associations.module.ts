import { Module } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { AssociationsController } from './associations.controller';
import { UsersController } from 'src/users/users.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Association } from './association.entity';

@Module({
  providers: [AssociationsService],
  controllers: [AssociationsController],
  imports:[UsersModule, TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Association])],
})

export class AssociationsModule {}
