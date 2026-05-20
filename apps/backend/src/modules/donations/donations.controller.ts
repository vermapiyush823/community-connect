import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@ApiTags('Donations')
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all donations' })
  findAll() {
    return this.donationsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new donation' })
  create(@Body() dto: CreateDonationDto) {
    return this.donationsService.create(dto);
  }
}
