import { Controller, Get, Body, Post , UseGuards} from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(
    private usersService:UsersService
  ){}

  @Get('dashboard')
  async getDashboards(){
    return await this.usersService.getDashboards();
  }


  @Post('create')
  async createUsers(@Body() createUserDto:CreateUserDto):Promise<any> {
    return this.usersService.create(createUserDto);
  }

  @Get('get-all')
  async getUsers(){
    return this.usersService.findAll();
  }

  @Post('delete')
  async delete(@Body('id') id:string){
    return this.usersService.remove(id);
  }


}
