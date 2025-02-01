import { Injectable } from '@nestjs/common';
import { AppointmentEntity } from '../../database/entity';
import { Repository, DataSource } from 'typeorm';
import { AppDataSource } from 'src/database/connection';

@Injectable()
export class AppointmentRepo extends Repository<AppointmentEntity> {
  protected connection = AppDataSource;
  constructor(protected dataSource: DataSource) {
    super(AppointmentEntity, dataSource.createEntityManager());
  }
}
