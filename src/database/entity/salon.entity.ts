import { Entity, Column, OneToMany } from 'typeorm';
import { Base } from './base';
import { BarberEntity } from './barber.entity';
import { SalonHoursEntity } from './salon-hours.entity';
import { ServiceTypeEntity } from './service-type.entity';

@Entity('salons')
export class SalonEntity extends Base {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @Column({ type: 'varchar' })
  address: string;

  @OneToMany(() => ServiceTypeEntity, (service) => service.salon)
  serviceTypes: ServiceTypeEntity[];

  @OneToMany(() => BarberEntity, (barber) => barber.salon)
  barbers: BarberEntity[];

  @OneToMany(() => SalonHoursEntity, (salonHours) => salonHours.salon)
  salonHours: SalonHoursEntity[];
}
