import { MinutesService } from './minutes.service';
import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Minute } from './minute.entity';
import { AuthGuard } from '@nestjs/passport';
import { MinuteInput } from './minute.input';
import { MinuteUpdate } from './minute.update';

@ApiTags('minutes')
@Controller('minutes')
export class MinutesController {
  constructor(private service: MinutesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({
    summary: 'Finds all the Minute',
  })
  async getAll(): Promise<Minute[]> {
    return await this.service.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({
    summary: 'Finds a Minute by ID',
  })
  async getById(@Param() param): Promise<Minute> {
    const association = await this.service.getById(+param.id);
    if (association === undefined) {
      throw new HttpException(
        `Could not find a minute with the id ${+param.id}`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      return association;
    }
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The minute has been successfully created.',
  })
  @ApiOperation({
    summary: 'Creates a Minute',
  })
  async create(@Body() input: MinuteInput): Promise<Minute> {
    const minute = await this.service.create(
      input.date,
      input.content,
      input.idVoters,
      input.idAssociation,
    );
    if (minute != undefined) {
      return minute;
    } else {
      throw new HttpException(
        `A user is not allowed to vote`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Updates a Minute',
  })
  async update(@Param() param, @Body() input: MinuteUpdate): Promise<void> {
    if (
      (await this.service.update(
        +param.id,
        input.date,
        input.content,
        input.idVoters,
        input.idAssociation,
      )) === undefined
    )
      throw new HttpException(
        `Could not find a Minute with the id ${+param.id}`,
        HttpStatus.NOT_FOUND, // Erreur générique à trouver
      );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletes a Minute',
  })
  @ApiCreatedResponse({
    description: 'The assocation has been successfully created.',
  })
  async deletion(@Param() param): Promise<void> {
    return await this.service.deletion(+param.id);
  }
}
