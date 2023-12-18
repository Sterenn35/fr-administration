import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { Association } from './association.entity';
import { User } from 'src/users/user.entity';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AssociationInput } from 'src/associations/AssociationInput';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('associations')
@Controller('associations')
export class AssociationsController {
    constructor(private service: AssociationsService) {}

    //@UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiOperation({
        summary: "Finds all the Association"
    })
    async getAll(): Promise<Association[]> {
        return await this.service.getAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @ApiOperation({
        summary: "Finds an Association by ID"
    })
    async getById(@Param() param): Promise<Association> {
        const association = await this.service.getById(+param.id); 
        if (association === undefined) {
            throw new HttpException(`Could not find an association with the id ${+param.id}`, HttpStatus.NOT_FOUND);
        } 
        else {
            return association;
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id/members')
    @ApiOperation({
        summary: "Finds all the members of an association by ID"
    })
    async getMembers(@Param() param): Promise<User[]> {
       return await this.service.getMembers(+param.id)
    }
    
    @Post()
    @ApiCreatedResponse({
        description: 'The assocation has been successfully created.'
    })
    @ApiOperation({
        summary: "Creates an Association"
    })
    async create(@Body() input : AssociationInput): Promise<Association> {
        let idUsers = input.idUsers.map(id => +id); // on convertit les id String en number
        return await this.service.create(idUsers, input.name);
    }

    @Put(':id')
    @ApiOperation({
        summary: "Updates an Association"
    })
    async update(@Param() param, @Body() input:any) : Promise<void>{
        if(await this.service.update(+param.id, input.idUsers, input.name) === undefined) throw new HttpException(`Could not find an association with the id ${+param.id}`, HttpStatus.NOT_FOUND);
    }

    @Delete(':id')
    @ApiOperation({
        summary: "Deletes an Association"
    })
    @ApiCreatedResponse({
        description: 'The assocation has been successfully created.'
    })
    async deletion(@Param() param) : Promise<void> {
        return await this.service.deletion(+param.id)
    }
}
