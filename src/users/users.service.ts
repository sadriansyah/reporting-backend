import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from '../schemas/users.schema';
import { CreateUserDto } from './dto/create-users.dto';
import * as bcrypt from 'bcrypt';
import { DepartmentService } from 'src/department/department.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel:Model<UsersDocument>,
    private departmentService: DepartmentService
  ){}


  async create(createUserDto:CreateUserDto):Promise<Users>{
    const {fullname, email, handphone, level, department_id } = createUserDto;
    const salt = await bcrypt.genSalt();
    const password = "garasi66";
    const payload = {
      fullname:fullname,
      email:email,
      handphone:handphone,
      level:level,
      department_id:department_id,
      signature:'',
      salt:salt,
      password:await bcrypt.hash(password, salt)
    };
    const add_data = new this.usersModel(payload);
    return await add_data.save();
  }

  async findAll(){
    const data = await this.usersModel.find().exec();
    return {
      status:200,
      data : data
    }
  }

  async remove(id){
    return await this.usersModel.findByIdAndRemove(id);
  }

  async findUserById(id:string){
    const user = await this.usersModel.findOne({_id:id});
    const department = await this.departmentService.findOne(user.department_id);
    if(!user){
      throw new NotFoundException("User not found");
    }
    return {
      _id:id,
      user_department:department.department_name,
      user_department_abbreviation:department.department_abbreviation,
      fullanme:user.fullname,
      email:user.email,
      handphone:user.handphone,
      level:user.level,
      department_id:user.department_id,
      signature:user.signature
    };
  }

  async findWith(any:any){
    const user = await this.usersModel.findOne(any);
    if(!user){
      throw new NotFoundException('Users Not Found');
    }
    return user;
  }

  async validateUser(email:string,password:string){
    const user = await this.usersModel.findOne({email:email});
    if(user && (await this.validatePassword(password,user.salt,user.password))){
      return user;
    }
    return null;
  }


  async validatePassword(password:string, salt:string, user_password:string):Promise<Boolean> {
    const hash = await bcrypt.hash(password, salt);
    return hash === user_password;
  }

  async getDashboards(){
    const data = await this.usersModel.find().count();
    return data;
  }


}
