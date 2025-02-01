import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base';
import { SalonEntity } from './salon.entity';
import { AppointmentEntity } from './appointment.entity';

@Entity('barbers')
export class BarberEntity extends Base {
  @Column({ type: 'varchar', length: 64 })
  name: string;

  @ManyToOne(() => SalonEntity, (salon) => salon.barbers)
  salon: SalonEntity;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.barber)
  appointments: AppointmentEntity[];
}
