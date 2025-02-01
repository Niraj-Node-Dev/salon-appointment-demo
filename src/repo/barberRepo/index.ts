import { Injectable } from '@nestjs/common';
import { BarberEntity } from '../../database/entity';
import { Repository, DataSource } from 'typeorm';
import { AppDataSource } from 'src/database/connection';

@Injectable()
export class BarberRepo extends Repository<BarberEntity> {
  protected connection = AppDataSource;
  constructor(protected dataSource: DataSource) {
    super(BarberEntity, dataSource.createEntityManager());
  }
}
