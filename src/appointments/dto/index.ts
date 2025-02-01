import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsDateString, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsUUID()
  salonId: string;

  @ApiProperty()
  @IsUUID()
  serviceId: string;

  @ApiProperty()
  @IsUUID()
  barberId: string;

  @ApiProperty()
  @IsDateString()
  appointment_date: string;

  @ApiProperty()
  @IsString()
  start_time: string;

  @ApiProperty()
  @IsString()
  end_time: string;
}

export class GetAvailableSlotsDto {
  @ApiProperty()
  @IsUUID()
  salonId: string;

  @ApiProperty()
  @IsUUID()
  serviceId: string;

  @ApiProperty()
  @IsDateString()
  date: string;
}
