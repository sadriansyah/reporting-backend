import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';

@Module({
  imports :[MailerModule.forRootAsync({
    useFactory: async () => ({
      transport:{
        host:process.env.MAIL_HOST,
        secure:false,
        auth:{
          user:process.env.MAIL_USER,
          pass:process.env.MAIL_PASSWORD
        },
      },
      defaults:{
        from :'"No Reply" <noreply@thinkmatch.id>',
      },
      template:{
        dir:join(__dirname, 'templates'),
        adapter:new HandlebarsAdapter(),
        options:{
          strict:true,
        },
      },
    })

  })],
  providers: [MailService],
  exports:[MailService],
})
export class MailModule {}
