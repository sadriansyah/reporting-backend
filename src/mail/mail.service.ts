import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SafeString } from 'handlebars';
import { join } from 'path';
@Injectable()
export class MailService {
  constructor(
    private mailerService:MailerService
  ){}

  async sendMom(to,cc,files,momdoc,subject, day, datetime, place, client,sender){
    var dt = []
    if(files != ""){
      var allFiles = files.split(',');
      for(var i= 0; i<allFiles.length;i++){
        if(allFiles[i] !=''){
          dt.push({
            path: join(__dirname,'../../uploads/mom',allFiles[i]),
            filename:files,
            contentDisposition:"attachment"
          })
        }
      }
    }
    dt.push({
      path: join(__dirname,'../../../uploads/mom',momdoc),
      filename:momdoc,
      contentDisposition:"attachment"
    })
    await this.mailerService.sendMail({
      to:to.split(','),
      cc:cc.split(','),
      subject:subject,
      template:'./sendmom',
      context:{
        day,datetime, place, client,sender
      },
      attachments:dt
    });
  }




}
