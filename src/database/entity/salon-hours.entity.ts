import { Entity, Column, ManyToOne } from 'typeorm';
import { Base } from './base';
import { SalonEntity } from './salon.entity';

@Entity('salon_hours')
export class SalonHoursEntity extends Base {
  @Column({ type: 'int' })
  day_of_week: number;

  @Column({ type: 'time' })
  opening_time: string;

  @Column({ type: 'time' })
  closing_time: string;

  @ManyToOne(() => SalonEntity, (salon) => salon.salonHours)
  salon: SalonEntity;
}
