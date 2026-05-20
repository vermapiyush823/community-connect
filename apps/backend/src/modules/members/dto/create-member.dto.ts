import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {
  @ApiProperty({ example: 'Rajesh Sharma' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Volunteer' })
  @IsString()
  @IsNotEmpty()
  role!: string;

  @ApiProperty({ example: '2026-01-15T00:00:00.000Z', required: false })
  @IsDateString()
  @IsOptional()
  joinedAt?: string;
}
