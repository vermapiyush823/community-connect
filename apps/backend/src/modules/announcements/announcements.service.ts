import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Announcement, AnnouncementDocument } from './schemas/announcement.schema';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectModel(Announcement.name) private readonly announcementModel: Model<AnnouncementDocument>,
  ) {}

  async create(dto: CreateAnnouncementDto): Promise<Announcement> {
    const created = new this.announcementModel(dto);
    return created.save();
  }

  async findAll(): Promise<Announcement[]> {
    return this.announcementModel.find().sort({ createdAt: -1 }).exec();
  }

  async findLatest(limit = 6): Promise<Announcement[]> {
    return this.announcementModel
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }
}
