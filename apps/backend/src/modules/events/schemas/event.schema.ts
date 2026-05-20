import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<CommunityEvent>;

@Schema({ timestamps: true, collection: 'events' })
export class CommunityEvent {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  venue!: string;

  @Prop({ required: true })
  date!: Date;

  @Prop({ default: '' })
  bannerImage!: string;
}

export const EventSchema = SchemaFactory.createForClass(CommunityEvent);
