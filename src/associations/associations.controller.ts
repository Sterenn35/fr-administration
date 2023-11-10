import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus} from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { Association } from './association.entity';
import { User } from 'src/users/user.entity';

@Controller('associations')
export class AssociationsController {
    constructor(private service: AssociationsService) {}

    @Get()
    async getAll(): Promise<Association[]> {
        return await this.service.getAll();
    }

    @Get(':id')
    async getById(@Param() param): Promise<Association> {
        const association = await this.service.getById(+param.id); 
        if (association === undefined) {
            throw new HttpException(`Could not find an association with the id ${+param.id}`, HttpStatus.NOT_FOUND);
        } 
        else {
            return association;
        }
    }

    @Get(':id/members')
    async getMembers(@Param() param): Promise<User[]> {
       return await this.service.getMembers(+param.id)
    }
    
    @Post()
    async create(@Body() input : any): Promise<Association> {
        return await this.service.create(input.idUsers, input.name);
    }

    @Put(':id')
    async update(@Param() param, @Body() input:any) : Promise<void>{
        if(await this.service.update(+param.id, input.idUsers, input.name) === undefined) throw new HttpException(`Could not find an association with the id ${+param.id}`, HttpStatus.NOT_FOUND);
    }

    @Delete(':id')
    async deletion(@Param() param) : Promise<void> {
        return await this.service.deletion(+param.id)
    }
}
