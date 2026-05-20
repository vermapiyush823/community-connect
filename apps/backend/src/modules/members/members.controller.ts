import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';

@ApiTags('Members')
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all members' })
  findAll() {
    return this.membersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new member' })
  create(@Body() dto: CreateMemberDto) {
    return this.membersService.create(dto);
  }
}
