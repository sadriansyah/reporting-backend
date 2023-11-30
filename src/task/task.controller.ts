import { Controller, Post, Body, Get, Param, Put, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('dashboard')
  async getDashboards() {
    return await this.taskService.getDashboards();
  }

  @Post('create')
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<any> {
    return await this.taskService.create_task(createTaskDto);
  }

  @Get('get-all')
  async getAll(): Promise<any> {
    return await this.taskService.viewAll();
  }

  @Get('view-all')
  async viewAll(): Promise<any> {
    return this.taskService.viewAll();
  }

  @Post('delete')
  async remove(@Body('id') id: string) {
    return await this.taskService.remove(id);
  }

  @Get('detail/:id')
  async detail(@Param('id') id: string) {
    return await this.taskService.findOne(id);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.taskService.update(id, updateTaskDto);
  }

  @Get('')
  async searchTask(@Query('date') date: string) {
    return await this.taskService.searchTask(date);
  }
}
