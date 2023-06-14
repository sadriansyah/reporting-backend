import { Controller, Body, Post,Get, UseGuards, Param, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from 'src/guard/jwt.guard';
import { GetUser } from './get-user.decorator';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-users.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService:AuthService,
    private readonly usersService:UsersService
  ){}


  @Post('login')
  async login(@Body() loginDto:LoginDto){
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  async refreshToken(@Body('refresh_token') refresh_token:string){
    return this.authService.refreshAccessToken(refresh_token);
  }

  @Get('user-log')
  @UseGuards(JwtGuard)
  async user_log(@GetUser() getuser):Promise<any>{
    return await this.usersService.findUserById(getuser.user._id);
  }

  @Post('register')
  async register(@Body() createUserDto:CreateUserDto){
    return await this.usersService.create(createUserDto);
  }


}
