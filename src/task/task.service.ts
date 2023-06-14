import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private  taskModel:Model<TaskDocument>,
    private usersService:UsersService
  ){}

  async create_task(createTaskDto:CreateTaskDto):Promise<Task> {
    const create = new this.taskModel(createTaskDto);
    return await create.save();
  }

  async findAll():Promise<any> {
    const data = await this.taskModel.find().exec();
    return {
      status:200,
      data,
    }
  }

  async viewAll():Promise<any>{
    const data = await this.taskModel.find().exec();

    var view = [];
    await Promise.all(data.map( async(row) => {
      const user = await this.usersService.findWith({handphone:row.no_handphone}).then((res) => {
        view.push({
          _id:row._id,
          task_date:row.task_date,
          no_handphone:row.no_handphone,
          user_name: res.fullname,
          done:row.done,
          doing:row.doing,
          to_do:row.to_do,
          blocker:row.blocker
        });
      }).catch((err) =>{
        view.push({
          _id:row._id,
          task_date:row.task_date,
          no_handphone:row.no_handphone,
          user_name: "Not Registered",
          done:row.done,
          doing:row.doing,
          to_do:row.to_do,
          blocker:row.blocker
        });
      });
    }));
    return await {
      status:200,
      data:view
    };
  }

  async remove(id:string) {
    return this.taskModel.findByIdAndRemove(id);
  }

  async findOne(id:string) {
    return this.taskModel.findById(id);
  }

  async update(id:string, updateTaskDto:UpdateTaskDto){
    return this.taskModel.findOneAndReplace({_id:id}, updateTaskDto, {new:true});
  }

  async searchTask(date:string){
    const data = await this.taskModel.find({task_date:date});
    var view = [];
    await Promise.all(data.map( async(row) => {
      const user = await this.usersService.findWith({handphone:row.no_handphone}).then((res) => {
        view.push({
          _id:row._id,
          task_date:row.task_date,
          no_handphone:row.no_handphone,
          user_name: res.fullname,
          done:row.done,
          doing:row.doing,
          to_do:row.to_do,
          blocker:row.blocker
        });
      });
    }));
    return await view;
  }

  async getDashboards(){
    const data = await this.taskModel.find().count();
    return data;
  }
}
