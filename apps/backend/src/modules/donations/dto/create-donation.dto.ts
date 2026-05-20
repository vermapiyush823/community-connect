import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDonationDto {
  @ApiProperty({ example: 'Priya Patel' })
  @IsString()
  @IsNotEmpty()
  donorName!: string;

  @ApiProperty({ example: 5000 })
  @IsNumber()
  @Min(1)
  amount!: number;

  @ApiProperty({ example: '2026-05-10T00:00:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  donatedAt?: string;
}
