import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from './base';
import { UserEntity } from './user.entity';
import { SalonEntity } from './salon.entity';
import { ServiceTypeEntity } from './service-type.entity';
import { BarberEntity } from './barber.entity';

@Entity('appointments')
export class AppointmentEntity extends Base {
  @ManyToOne(() => UserEntity, (user) => user.appointments, { cascade: true })
  user: UserEntity;

  @ManyToOne(() => SalonEntity, (salon) => salon.serviceTypes, {
    cascade: true,
  })
  salon: SalonEntity;

  @ManyToOne(() => ServiceTypeEntity, (service) => service.appointments, {
    cascade: true,
  })
  service: ServiceTypeEntity;

  @ManyToOne(() => BarberEntity, (barber) => barber.appointments, {
    cascade: true,
  })
  barber: BarberEntity;

  @Column({ type: 'date' })
  appointment_date: Date;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;
}
