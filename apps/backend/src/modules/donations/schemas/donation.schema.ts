import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DonationDocument = HydratedDocument<Donation>;

@Schema({ timestamps: true, collection: 'donations' })
export class Donation {
  @Prop({ required: true })
  donorName!: string;

  @Prop({ required: true })
  amount!: number;

  @Prop({ default: () => new Date() })
  donatedAt!: Date;
}

export const DonationSchema = SchemaFactory.createForClass(Donation);
