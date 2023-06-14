import { Controller,Post, Body,Get , Param, Put, UseGuards} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';
import { JwtGuard } from 'src/guard/jwt.guard';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('project')
@UseGuards(JwtGuard)
export class ProjectController {
  constructor(
    private projectService:ProjectService
  ){}

  @Get('dashboard')
  async getDashboards(){
    return await this.projectService.getDashboards();
  }

  @Post('create')
  async createProject(@Body() createProjectDto:CreateProjectDto):Promise<any> {
    return await this.projectService.create_project(createProjectDto);
  }

  @Get('get-all')
  async getAll():Promise<any> {
    return await this.projectService.findAll();
  }


  @Post('delete')
  async remove(@Body('id') id:string){
    return await this.projectService.remove(id);
  }

  @Put('update/:id')
  async update(@Param('id') id:string, @Body() updateProjectDto:UpdateProjectDto){
    return await this.projectService.update(id, updateProjectDto);
  }

  @Get('detail/:id')
  async detail(@Param('id') id:string){
    return await this.projectService.findOne(id);
  }


}
