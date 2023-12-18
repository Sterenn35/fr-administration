import { Module } from '@nestjs/common';
import { MinutesService } from './minutes.service';
import { MinutesController } from './minutes.controller';
import { UsersModule } from 'src/users/users.module';
import { AssociationsModule } from 'src/associations/associations.module';
import { Minute } from './minute.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule, AssociationsModule, TypeOrmModule.forFeature([Minute])],
  providers: [MinutesService],
  controllers: [MinutesController]
})
export class MinutesModule {}
