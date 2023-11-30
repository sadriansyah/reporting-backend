import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMom(
    to,
    cc,
    files,
    momdoc,
    subject,
    day,
    datetime,
    place,
    client,
    sender,
  ) {
    const dt = [];
    if (files != '') {
      const allFiles = files.split(',');
      for (let i = 0; i < allFiles.length; i++) {
        if (allFiles[i] != '') {
          dt.push({
            path: join(__dirname, '../../uploads/mom', allFiles[i]),
            filename: files,
            contentDisposition: 'attachment',
          });
        }
      }
    }
    dt.push({
      path: join(__dirname, '../../../uploads/mom', momdoc),
      filename: momdoc,
      contentDisposition: 'attachment',
    });

    await this.mailerService.sendMail({
      to: to.split(','),
      cc: cc.split(','),
      subject: subject,
      template: './sendmom',
      context: {
        day,
        datetime,
        place,
        client,
        sender,
      },
      attachments: dt,
    });
  }
}
