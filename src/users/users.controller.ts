import { Controller, Get, Post, Put, Delete, Body, Param , HttpException, HttpStatus} from '@nestjs/common';

import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService) {}

    @Get()
    async getAll(): Promise<User[]> {
        return await this.service.getAll();
    }

    @Get(':id')
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
    async create(@Body() input : any): Promise<User> {
        return await this.service.create(input.lastname, input.firstname, input.age);
    }

    @Put(':id')
    async update(@Param() param, @Body() input:any) : Promise<void> {
        if(await this.service.update(+param.id, input.lastname, input.firstname, input.age) === undefined) throw new HttpException(`Could not find a user with the id ${+param.id}`, HttpStatus.NOT_FOUND);
    }

    @Delete(':id')
    async deletion(@Param() param) : Promise<void> {
        await this.service.deletion(+param.id)
    }
}
