import { Controller, Get, Post, Put, Delete, Body, Param , HttpException, HttpStatus} from '@nestjs/common';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserInput } from './UserInput';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private service: UsersService) {}

    @Get()
    @ApiOperation({
        summary: "Finds all Users"
    })
    async getAll(): Promise<User[]> {
        return await this.service.getAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: "Finds a User by ID"
    })
    async getById(@Param() param): Promise<User> {
        const user = await this.service.getById(+param.id); 
        if (user === undefined) {
            throw new HttpException(`Could not find a user with the id ${+param.id}`, HttpStatus.NOT_FOUND);
        } 
        else {
            return user;
        }
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The user has been successfully created.'
    })
    @ApiOperation({
        summary: "Creates a User"
    })
    public async create(@Body() input: UserInput): Promise<User> {
        return this.service.create(input.firstname, input.lastname, input.age);
    }

    @Put(':id')
    @ApiOperation({
        summary: "Updates a User"
    })
    async update(@Param() param, @Body() input:any) : Promise<void> {
        if(await this.service.update(+param.id, input.lastname, input.firstname, input.age) === undefined) throw new HttpException(`Could not find a user with the id ${+param.id}`, HttpStatus.NOT_FOUND);
    }

    @Delete(':id')
    @ApiOperation({
        summary: "Deletes a User"
    })
    async deletion(@Param() param) : Promise<void> {
        await this.service.deletion(+param.id)
    }
}
