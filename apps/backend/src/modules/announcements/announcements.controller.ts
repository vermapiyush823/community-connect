import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@ApiTags('Announcements')
@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) { }

  @Get()
  @ApiOperation({ summary: 'Get all announcements' })
  findAll() {
    return this.announcementsService.findAll();
  }

  @Get('latest')
  @ApiOperation({ summary: 'Get latest announcements for carousel' })
  findLatest() {
    return this.announcementsService.findLatest();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new announcement' })
  create(@Body() dto: CreateAnnouncementDto) {
    return this.announcementsService.create(dto);
  }
}
