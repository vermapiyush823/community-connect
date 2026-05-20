import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AnnouncementDocument = HydratedDocument<Announcement>;

@Schema({ timestamps: true, collection: 'announcements' })
export class Announcement {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  imageUrl!: string;

  @Prop({ required: true })
  category!: string;

  @Prop({ required: true })
  eventDate!: Date;

  @Prop({ default: () => new Date() })
  createdAt!: Date;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);
