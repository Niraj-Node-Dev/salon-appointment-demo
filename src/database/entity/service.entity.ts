import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base';
import { SalonEntity } from './salon.entity';
import { AppointmentEntity } from './appointment.entity';

@Entity('service_types')
export class ServiceTypeEntity extends Base {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  duration: number;

  @ManyToOne(() => SalonEntity, (salon) => salon.serviceTypes)
  salon: SalonEntity;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.service)
  appointments: AppointmentEntity[];
}
