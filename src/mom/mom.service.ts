import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mom, MomDocument } from '../schemas/mom.schema';
import { CreateMomDto } from './dto/create-mom.dto';
import { UpdateMomDto } from './dto/update-mom.dto';
import { ProjectService } from 'src/project/project.service';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class MomService {
  constructor(
    @InjectModel(Mom.name) private readonly momModel: Model<MomDocument>,
    private projectService: ProjectService,
    private mailService: MailService,
  ) {}

  async create(
    user_id: string,
    createMomDto: CreateMomDto,
    file: string,
  ): Promise<Mom> {
    const {
      meeting_number,
      meeting_project_id,
      to_email,
      cc_email,
      date_and_time,
      meeting_organizer,
      meeting_draft_dated,
      meeting_location,
      meeting_chair,
      meeting_title,
      meeting_summary,
      meeting_dibuat,
      meeting_mengetahui,
    } = createMomDto;
    const attach = {
      meeting_creator: user_id,
      meeting_number,
      meeting_project_id,
      to_email,
      cc_email,
      date_and_time,
      meeting_organizer,
      meeting_draft_dated,
      meeting_location,
      meeting_chair,
      meeting_title,
      meeting_summary,
      meeting_dibuat,
      meeting_mengetahui,
      meeting_attachment: file,
    };
    const createMom = new this.momModel(attach);
    return createMom.save();
  }

  async findAll(): Promise<any> {
    const data = await this.momModel.find().exec();
    return {
      status: 200,
      data: data,
    };
  }

  async getPrefix(prefix: string) {
    const data = await this.momModel
      .find({ meeting_number: { $regex: '.*' + prefix + '.*' } }, [
        'meeting_number',
        'date_and_time',
      ])
      .sort({ date_and_time: -1 })
      .limit(1)
      .exec();
    return await data;
  }

  async getMomNumber(project_id: string) {
    const mom = await this.momModel.find({ meeting_project_id: project_id });
    console.log(mom);
  }

  async update(id: string, updateMomDto: UpdateMomDto, file: string) {
    const {
      meeting_creator,
      meeting_number,
      meeting_project_id,
      to_email,
      cc_email,
      date_and_time,
      meeting_organizer,
      meeting_draft_dated,
      meeting_location,
      meeting_chair,
      meeting_title,
      meeting_summary,
      meeting_dibuat,
      meeting_mengetahui,
      existing_attachment,
    } = updateMomDto;
    const fileExist = JSON.parse(existing_attachment);
    let existAttachment = '';
    for (let i = 0; i < fileExist.length; i++) {
      if (fileExist.length == 1 || i + 1 == fileExist.length) {
        existAttachment += fileExist[i];
      } else {
        existAttachment += fileExist[i] + ',';
      }
    }
    if (existAttachment != '') {
      existAttachment += ',' + file;
    } else {
      existAttachment = file;
    }

    const payload = {
      meeting_creator,
      meeting_number,
      meeting_project_id,
      to_email,
      cc_email,
      date_and_time,
      meeting_organizer,
      meeting_draft_dated,
      meeting_location,
      meeting_chair,
      meeting_title,
      meeting_summary,
      meeting_dibuat,
      meeting_mengetahui,
      meeting_attachment: existAttachment,
    };

    return this.momModel.findOneAndReplace({ _id: id }, payload, { new: true });
  }

  async remove(id: string) {
    return this.momModel.findByIdAndRemove(id);
  }

  async findOne(id: string) {
    const mom = await this.momModel.findById(id);
    const project = await this.projectService.findOne(mom.meeting_project_id);
    return {
      status: 200,
      data: {
        mom: mom,
        project: project,
      },
    };
  }

  async sendMail(id: string) {
    const mom = await this.momModel.findById(id);
    const project = await this.projectService.findOne(mom.meeting_project_id);
    const filename =
      'MOM - ' +
      mom.meeting_title +
      ' (' +
      this.getdatetime(mom.date_and_time) +
      ')' +
      '.pdf';
    //email
    const subject =
      'MOM Thinkmatch ' +
      project.project_company +
      ' ' +
      mom.meeting_location +
      ' ' +
      this.getdatetime(mom.date_and_time);
    const datatime = this.getdatetime(mom.date_and_time);
    const day = this.showday(mom.date_and_time);
    const place = mom.meeting_location;
    const client = project.project_company;
    const sender = mom.meeting_dibuat;
    //endmail
    await this.mailService.sendMom(
      mom.to_email,
      mom.cc_email,
      mom.meeting_attachment,
      filename,
      subject,
      day,
      datatime,
      place,
      client,
      sender,
    );
    return {
      status: 200,
      message: 'Mail Sent Successfully',
    };
  }

  async generatePdf(id) {
    // const mom = await this.momModel.findById(id);
    // const browser = await puppeteer.launch({headless:true});
    // const page = await browser.newPage();
    // const html = fs.readFileSync('src/mom/generate/docmom.html','utf-8');
    // await page.setContent(html,{waitUntil:'domcontentloaded'});
    // const filelocation = "uploads/mom/generate/"+"MOM - "+mom.meeting_title+" ("+this.getdatetime(mom.date_and_time)+")"+".pdf";
    // await page.pdf({
    //   path:filelocation,
    //   format:'A3',
    //   margin:{left: "64px", right: "64px"}
    // });
    return {
      status: 200,
      message: 'File Successfully Generated',
    };
  }

  async getDashboards() {
    const data = await this.momModel.find().count();
    return data;
  }

  showday(date: string | number | Date) {
    const days = [
      'Minggu',
      'Senin',
      'Selasa',
      'Rabu',
      'Kamis',
      'Jumat',
      'Sabtu',
    ];
    const d = new Date(date);
    const dayName = days[d.getDay()];
    return dayName;
  }

  getdatetime(date: string | number | Date) {
    const currentdate = new Date(date);
    const month = currentdate.getMonth();
    const day = (currentdate.getDate() < 10 ? '0' : '') + currentdate.getDate();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const datetime =
      day + ' ' + monthNames[month] + ' ' + currentdate.getFullYear();
    return datetime;
  }
}
