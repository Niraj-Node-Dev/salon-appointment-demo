import { Injectable } from '@nestjs/common';
import { SalonHoursEntity } from '../../database/entity';
import { Repository, DataSource } from 'typeorm';
import { AppDataSource } from 'src/database/connection';

@Injectable()
export class SalonHourRepo extends Repository<SalonHoursEntity> {
  protected connection = AppDataSource;
  constructor(protected dataSource: DataSource) {
    super(SalonHoursEntity, dataSource.createEntityManager());
  }
}
