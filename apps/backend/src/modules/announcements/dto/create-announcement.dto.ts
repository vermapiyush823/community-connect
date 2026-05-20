import { IsString, IsNotEmpty, IsDateString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnnouncementDto {
  @ApiProperty({ example: 'Blood Donation Camp' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Join us for a community blood donation drive' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  @IsNotEmpty()
  imageUrl!: string;

  @ApiProperty({ example: 'health', enum: ['health', 'community', 'charity', 'festival', 'education', 'sports'] })
  @IsString()
  @IsIn(['health', 'community', 'charity', 'festival', 'education', 'sports'])
  category!: string;

  @ApiProperty({ example: '2026-06-15T10:00:00.000Z' })
  @IsDateString()
  eventDate!: string;
}
