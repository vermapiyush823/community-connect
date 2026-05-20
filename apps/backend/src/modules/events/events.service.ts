import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommunityEvent, EventDocument } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(CommunityEvent.name) private readonly eventModel: Model<EventDocument>,
  ) {}

  async create(dto: CreateEventDto): Promise<CommunityEvent> {
    const created = new this.eventModel(dto);
    return created.save();
  }

  async findAll(): Promise<CommunityEvent[]> {
    return this.eventModel.find().sort({ date: -1 }).exec();
  }

  async findUpcoming(limit = 5): Promise<CommunityEvent[]> {
    return this.eventModel
      .find({ date: { $gte: new Date() } })
      .sort({ date: 1 })
      .limit(limit)
      .exec();
  }

  async countUpcoming(): Promise<number> {
    return this.eventModel.countDocuments({ date: { $gte: new Date() } }).exec();
  }
}
