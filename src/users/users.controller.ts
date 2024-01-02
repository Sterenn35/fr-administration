import { Controller, Get, Post, Put, Delete, Body, Param , HttpException, HttpStatus, UseGuards} from '@nestjs/common';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserInput } from './user.input';
import { AuthGuard } from '@nestjs/passport';
import { Association } from 'src/associations/association.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(private service: UsersService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @ApiOperation({
        summary: "Finds all Users"
    })
    async getAll(): Promise<User[]> {
        return await this.service.getAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('email') // It's more like a get but to fetch the result in the front, it's necessary a post method to give data 
    @ApiOperation({
        summary: "Finds a User by Email"
    })
    async getbyEmail(@Body() body): Promise<User> {
        console.log("Entrée dans la fonction");
        const user = await this.service.getByEmail(body.email);
        if (user === null) {
            throw new HttpException(`Could not find a user with the email : ${body.email}`, HttpStatus.NOT_FOUND);
        } 
        else {
            return user;
        }
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
        const user = this.service.create(input.firstname, input.lastname, input.age, input.password, input.email);
        if (user === undefined) throw new HttpException(`User already exists`, HttpStatus.FOUND);
        else {
            return user;
        }
    }

    @Put(':id')
    @ApiOperation({
        summary: "Updates a User"
    })
    async update(@Param() param, @Body() input:any) : Promise<void> {
        if(await this.service.update(+param.id, input.lastname, input.firstname, input.age, input.password, input.email) === undefined) throw new HttpException(`Could not find a user with the id ${+param.id}`, HttpStatus.NOT_FOUND);
    }

    @Delete(':id')
    @ApiOperation({
        summary: "Deletes a User"
    })
    async deletion(@Param() param) : Promise<void> {
        await this.service.deletion(+param.id)
    }
}
