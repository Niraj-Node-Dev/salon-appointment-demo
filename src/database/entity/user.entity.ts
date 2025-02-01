import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base';
import { AppointmentEntity } from './appointment.entity';

@Entity('users')
export class UserEntity extends Base {
  @Column({ type: 'varchar', length: 64 })
  name: string;

  @Column({ type: 'varchar', length: 64, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 64 })
  mobile: string;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.user)
  appointments: AppointmentEntity[];
}
