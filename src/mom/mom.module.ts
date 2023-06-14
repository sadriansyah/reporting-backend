import { Module } from '@nestjs/common';
import { MomController } from './mom.controller';
import { MomService } from './mom.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Mom, MomSchema } from '../schemas/mom.schema';
import { ProjectModule } from 'src/project/project.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports:[MongooseModule.forFeature([{name:Mom.name, schema:MomSchema}]), ProjectModule, MailModule],
  controllers: [MomController],
  providers: [MomService]
})
export class MomModule {}
