import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ example: 'Annual Community Meetup' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'A gathering of all community members to discuss upcoming plans' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: 'Community Hall, Sector 21, Noida' })
  @IsString()
  @IsNotEmpty()
  venue!: string;

  @ApiProperty({ example: '2026-07-20T17:00:00.000Z' })
  @IsDateString()
  date!: string;

  @ApiProperty({ example: 'https://example.com/banner.jpg', required: false })
  @IsString()
  @IsOptional()
  bannerImage?: string;
}
