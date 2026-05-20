import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member, MemberDocument } from './schemas/member.schema';
import { CreateMemberDto } from './dto/create-member.dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name) private readonly memberModel: Model<MemberDocument>,
  ) {}

  async create(dto: CreateMemberDto): Promise<Member> {
    const created = new this.memberModel(dto);
    return created.save();
  }

  async findAll(): Promise<Member[]> {
    return this.memberModel.find().sort({ joinedAt: -1 }).exec();
  }

  async countAll(): Promise<number> {
    return this.memberModel.countDocuments().exec();
  }

  async countByRole(role: string): Promise<number> {
    return this.memberModel.countDocuments({ role }).exec();
  }
}
