import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { DepartmentService } from './department.service';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('department')
@UseGuards(JwtGuard)
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Post('create')
  async create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<any> {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get('get-all')
  async getAll(): Promise<any> {
    return this.departmentService.findAll();
  }

  @Post('delete')
  async remove(@Body('id') id: string) {
    return await this.departmentService.remove(id);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return await this.departmentService.update(id, updateDepartmentDto);
  }

  @Get('detail/:id')
  async detail(@Param('id') id: string) {
    return await this.departmentService.findOne(id);
  }
}
