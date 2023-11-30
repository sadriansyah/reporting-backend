import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from '../schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async create_project(createProjectDto: CreateProjectDto): Promise<Project> {
    const create = new this.projectModel(createProjectDto);
    return await create.save();
  }

  async findAll(): Promise<any> {
    const data = await this.projectModel.find().exec();
    return {
      status: 200,
      data,
    };
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectModel.findOneAndReplace({ _id: id }, updateProjectDto, {
      new: true,
    });
  }

  async remove(id: string) {
    return this.projectModel.findByIdAndRemove(id);
  }

  async findOne(id: string) {
    return this.projectModel.findById(id);
  }

  async getDashboards() {
    const data = await this.projectModel.find().count();
    return data;
  }
}
