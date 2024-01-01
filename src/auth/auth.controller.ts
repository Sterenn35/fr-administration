import { Body, Controller, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() request) {
      return this.authService.login(request.user);
    }

    @Post('register')
    async register(@Body() body:any) {
      const user = await this.authService.register(body.firstname, body.lastname, +body.age, body.email, body.password);
      if (user === undefined) throw new HttpException(`User already exists`, HttpStatus.FOUND);
      else {
        return this.authService.login({email : body.email, id : user.id}); 
      }
    }
}
