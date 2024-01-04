import { Body, Controller, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}
    @UseGuards(AuthGuard('local'))
    @ApiCreatedResponse({
      description: 'The user is logged in.'
  })
    @ApiOperation({
        summary: "Login a user with email and password."
    })
    @Post('login')
    async login(@Request() request) {
      return this.authService.login(request.user);
    }

    @Post('register')
    @ApiCreatedResponse({
      description: 'The user has been successfully created and he\'s logged in.'
    })
    @ApiOperation({
        summary: "Creates a user and logged in him."
    })
    async register(@Body() body:any) {
      const user = await this.authService.register(body.firstname, body.lastname, +body.age, body.email, body.password);
      if (user === undefined) throw new HttpException(`User already exists`, HttpStatus.FOUND);
      else {
        return this.authService.login({email : body.email, id : user.id}); 
      }
    }
}
