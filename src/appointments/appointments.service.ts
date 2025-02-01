import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Between } from 'typeorm';
import {
  AppointmentRepo,
  BarberRepo,
  SalonHourRepo,
  SalonRepo,
  ServiceTypeRepo,
  UserRepo,
} from '../repo';
import { CreateAppointmentDto, GetAvailableSlotsDto } from './dto';
import { AppointmentEntity } from 'src/database/entity';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentRepository: AppointmentRepo,
    private readonly userRepository: UserRepo,
    private readonly salonRepository: SalonRepo,
    private readonly serviceRepository: ServiceTypeRepo,
    private readonly barberRepository: BarberRepo,
    private readonly salonHoursRepository: SalonHourRepo,
  ) {}

  async bookAppointment(createAppointmentDto: CreateAppointmentDto) {
    const {
      userId,
      salonId,
      serviceId,
      barberId,
      appointment_date,
      start_time,
      end_time,
    } = createAppointmentDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const salon = await this.salonRepository.findOne({
      where: { id: salonId },
    });
    if (!salon) throw new NotFoundException('Salon not found');

    const service = await this.serviceRepository.findOne({
      where: { id: serviceId },
    });
    if (!service) throw new NotFoundException('Service not found');

    const barber = await this.barberRepository.findOne({
      where: { id: barberId },
    });
    if (!barber) throw new NotFoundException('Barber not found');

    const overlappingAppointment = await this.appointmentRepository.findOne({
      where: {
        barber: { id: barberId },
        appointment_date: new Date(appointment_date),
        start_time: Between(start_time, end_time),
      },
    });
    if (overlappingAppointment) {
      throw new BadRequestException('Barber is already booked at this time');
    }

    const appointment = this.appointmentRepository.create({
      appointment_date,
      start_time,
      end_time,
      user,
      salon,
      service,
      barber,
    });

    return await this.appointmentRepository.save(appointment);
  }

  async getAvailableSlots(getAvailableSlotsDto: GetAvailableSlotsDto) {
    const { salonId, serviceId, date } = getAvailableSlotsDto;

    const salon = await this.salonRepository.findOne({
      where: { id: salonId },
    });
    if (!salon) throw new NotFoundException('Salon not found');

    const service = await this.serviceRepository.findOne({
      where: { id: serviceId },
    });
    if (!service) throw new NotFoundException('Service not found');

    const salonHours = await this.salonHoursRepository.find({
      where: { salon: { id: salonId } },
    });
    if (!salonHours || salonHours.length === 0) {
      throw new NotFoundException('Salon hours not set');
    }

    const appointments = await this.appointmentRepository.find({
      where: { salon: { id: salonId }, appointment_date: new Date(date) },
    });

    const appointmentDay = new Date(date).getDay();
    const salonWorkingHours = salonHours.find(
      (hours) => hours.day_of_week === appointmentDay,
    );
    if (!salonWorkingHours) {
      throw new NotFoundException('Salon is closed on this day');
    }

    const availableSlots = this.generateAvailableSlots(
      salonWorkingHours.opening_time,
      salonWorkingHours.closing_time,
      service.duration,
      appointments,
    );

    return availableSlots;
  }

  async getUserAppointments(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [
        'appointments',
        'appointments.salon',
        'appointments.service',
        'appointments.barber',
      ],
    });
    if (!user) throw new NotFoundException('User not found');

    return user.appointments;
  }

  private generateAvailableSlots(
    openingTime: string,
    closingTime: string,
    serviceDuration: number,
    appointments: AppointmentEntity[],
  ): string[] {
    const slots: string[] = [];
    let currentTime = openingTime;

    while (currentTime < closingTime) {
      const isSlotAvailable = !appointments.some(
        (appointment) =>
          appointment.start_time <= currentTime &&
          appointment.end_time > currentTime,
      );

      if (isSlotAvailable) {
        slots.push(currentTime);
      }

      currentTime = this.addMinutes(currentTime, serviceDuration);
    }

    return slots;
  }

  private addMinutes(time: string, minutes: number): string {
    const [hours, mins] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60);
    const newMins = totalMinutes % 60;
    return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`;
  }
}
