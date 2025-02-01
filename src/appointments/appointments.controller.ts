import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateAppointmentDto, GetAvailableSlotsDto } from './dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @ApiOperation({ summary: 'Book an appointment' })
  @Post()
  async bookAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return await this.appointmentsService.bookAppointment(createAppointmentDto);
  }

  @ApiOperation({ summary: 'Get available slots for a salon and service' })
  @Get('available-slots')
  getAvailableSlots(@Query() getAvailableSlotsDto: GetAvailableSlotsDto) {
    return this.appointmentsService.getAvailableSlots(getAvailableSlotsDto);
  }

  @ApiOperation({ summary: 'Get appointments for a user' })
  @Get(':userId')
  getUserAppointments(@Param('userId', new ParseUUIDPipe()) userId: string) {
    return this.appointmentsService.getUserAppointments(userId);
  }
}
