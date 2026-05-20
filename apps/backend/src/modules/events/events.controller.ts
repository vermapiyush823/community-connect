import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Get upcoming events' })
  findUpcoming() {
    return this.eventsService.findUpcoming();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }
}
