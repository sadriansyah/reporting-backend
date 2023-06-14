import { Controller, Get, Post, Body, Put, Param, UploadedFile, UseInterceptors, Res, UseGuards } from '@nestjs/common';
import { MomService } from './mom.service';
import { CreateMomDto } from './dto/create-mom.dto';
import { UpdateMomDto } from './dto/update-mom.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as puppeteer from 'puppeteer';
const fs = require('fs');
import { JwtGuard } from 'src/guard/jwt.guard';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('mom')

export class MomController {

  constructor(
    private momService:MomService
  ){}

  @Get('dashboard')
  async getDashboards(){
    return await this.momService.getDashboards();
  }


  @Post('create')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file',{
    storage:diskStorage({
      destination:'./uploads/mom',
      filename:(req,file,callback)=>{
        const uniqueSuffix = Date.now()+"-"+Math.round(Math.random()*1e9);
        const ext = extname(file.originalname);
        const filename = `MOM - ${uniqueSuffix}${ext}`;
        callback(null,filename);
      }
    })
  }))
  async createMom(@GetUser() getuser, @Body() createMomDto:CreateMomDto, @UploadedFile() file?:Express.Multer.File){
    return await this.momService.create(getuser.user_id,createMomDto,file?file.filename:'');
  }

  @Get('get-all')
  @UseGuards(JwtGuard)
  async getAll(){
    return await this.momService.findAll();
  }

  @Post('delete')
  @UseGuards(JwtGuard)
  async remove(@Body('id') id:string){
    return await this.momService.remove(id);
  }

  @Put('update/:id')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file',{
    storage:diskStorage({
      destination:'./uploads/mom',
      filename:(req,file,callback)=>{
        const uniqueSuffix = Date.now()+"-"+Math.round(Math.random()*1e9);
        const ext = extname(file.originalname);
        const filename = `MOM - ${uniqueSuffix}${ext}`;
        callback(null,filename);
      }
    })
  }))
  async update(@Param('id') id:string, @Body() updateMomDto:UpdateMomDto, @UploadedFile() file?:Express.Multer.File){
    return await this.momService.update(id, updateMomDto, file?file.filename:'');
  }


  @Get("with-prefix/:prefix")
  async getWithPrefix(@Param('prefix') prefix:string){
    return await this.momService.getPrefix(prefix);
  }

  @Get('detail/:id')
  async detail(@Param('id') id:string){
    return await this.momService.findOne(id);
  }

  @Get('file-mom/:imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
      console.log(res);
      return res.sendFile(image, { root: './uploads/mom' });
    }


  @Post("generate-mom")
  @UseGuards(JwtGuard)
  async generateFile(@Body('id') id:string){
    return await this.momService.generatePdf(id);
  }

  @Post('send-mail')
  @UseGuards(JwtGuard)
  async sendMail(@Body('id') id:string){
    return await this.momService.sendMail(id);
  }

  @Get("mom-number")
  async getMomNumber(@Body('project_id') project_id:string){
    return await this.momService.getMomNumber(project_id);
  }




}
