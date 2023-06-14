import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department, DepartmentDocument } from '../schemas/department.schema';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name) private departmentModel:Model<DepartmentDocument>
  ){}

  async create(createDepartmentDto:CreateDepartmentDto):Promise<Department> {
    const create = new this.departmentModel(createDepartmentDto);
    return await create.save();
  }

  async findAll():Promise<any> {
    try {
      const data = await this.departmentModel.find().exec();
      return {
        status:200,
        data,
      }
    } catch (error) {
      return {
        status:500,
        message:error
      }
    }
  }

  async update(id:string, updateDepartmentDto:UpdateDepartmentDto){
    return await this.departmentModel.findOneAndReplace({_id:id}, updateDepartmentDto,{new:true});
  }

  async remove(id:string){
    return this.departmentModel.findByIdAndRemove(id);
  }

  async findOne(id:string){
    return this.departmentModel.findById(id);
  }

}
