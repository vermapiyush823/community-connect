import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Donation, DonationSchema } from './schemas/donation.schema';
import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Donation.name, schema: DonationSchema }]),
  ],
  controllers: [DonationsController],
  providers: [DonationsService],
  exports: [DonationsService],
})
export class DonationsModule {}
