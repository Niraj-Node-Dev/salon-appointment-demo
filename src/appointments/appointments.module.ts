import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import {
  AppointmentRepo,
  BarberRepo,
  SalonHourRepo,
  SalonRepo,
  ServiceTypeRepo,
  UserRepo,
} from 'src/repo';

@Module({
  controllers: [AppointmentsController],
  providers: [
    AppointmentsService,
    AppointmentRepo,
    UserRepo,
    SalonRepo,
    SalonHourRepo,
    ServiceTypeRepo,
    BarberRepo,
  ],
})
export class AppointmentsModule {}
