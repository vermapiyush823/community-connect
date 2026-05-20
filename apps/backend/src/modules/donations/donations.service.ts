import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Donation, DonationDocument } from './schemas/donation.schema';
import { CreateDonationDto } from './dto/create-donation.dto';

@Injectable()
export class DonationsService {
  constructor(
    @InjectModel(Donation.name) private readonly donationModel: Model<DonationDocument>,
  ) {}

  async create(dto: CreateDonationDto): Promise<Donation> {
    const created = new this.donationModel(dto);
    return created.save();
  }

  async findAll(): Promise<Donation[]> {
    return this.donationModel.find().sort({ donatedAt: -1 }).exec();
  }

  async sumThisMonth(): Promise<number> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const result = await this.donationModel.aggregate([
      { $match: { donatedAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    return result.length > 0 ? (result[0] as { total: number }).total : 0;
  }
}
