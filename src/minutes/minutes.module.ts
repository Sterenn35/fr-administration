import { Module } from '@nestjs/common';
import { MinutesService } from './minutes.service';
import { MinutesController } from './minutes.controller';

@Module({
  providers: [MinutesService],
  controllers: [MinutesController]
})
export class MinutesModule {}
