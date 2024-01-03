import { Controller, Get, Post, Put, Delete, Body, Param , HttpException, HttpStatus, } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { Role } from './role.entity';
import { RoleInput } from './role.input';
import { RoleUpdate } from './role.update';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
    constructor(private service: RolesService) {}

    @Get()
    @ApiOperation({
        summary: "Finds all Roles"
    })
    async getAll(): Promise<Role[]> {
        return await this.service.getAll();
    }

    @Get(':idUser/:idAssociation')
    @ApiOperation({
        summary: "Finds a Role by ID"
    })
    async getById(@Param() param): Promise<Role> {
        const role = await this.service.getById(+param.idUser, +param.idAssociation); 
        if (role === null) {
            throw new HttpException(`Could not find a role with this pair of id ${+param.idUser}, ${+param.idAssociation}`, HttpStatus.NOT_FOUND);
        } 
        else {
            return role;
        }
    }

    @Post()
    @ApiCreatedResponse({
        description: 'The role has been successfully created.'
    })
    @ApiOperation({
        summary: "Creates a role"
    })
    public async create(@Body() input: RoleInput): Promise<Role> {
        return this.service.create(input.name, input.idUser, input.idAssociation);
    }

    @Put(':idUser/:idAssociation')
    @ApiOperation({
        summary: "Updates a Role"
    })
    async update(@Param() param, @Body() input:RoleUpdate) : Promise<void> {
        if(await this.service.update(+param.idUser, +param.idAssociation, input.name) === undefined) throw new HttpException(`Could not find a role with the pair of id ${+param.idUser}, ${+param.idAssociation}`, HttpStatus.NOT_FOUND);
    }

    @Delete(':idUser/:idAssociation')
    @ApiOperation({
        summary: "Deletes a Role"
    })
    async deletion(@Param() param) : Promise<void> {
        await this.service.deletion(+param.idUser, +param.idAssociation)
    }
}
