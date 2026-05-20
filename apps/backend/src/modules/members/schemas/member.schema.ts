import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MemberDocument = HydratedDocument<Member>;

@Schema({ timestamps: true, collection: 'members' })
export class Member {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  role!: string;

  @Prop({ default: () => new Date() })
  joinedAt!: Date;
}

export const MemberSchema = SchemaFactory.createForClass(Member);
