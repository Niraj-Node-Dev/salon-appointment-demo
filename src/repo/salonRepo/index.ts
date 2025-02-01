import { Injectable } from '@nestjs/common';
import { SalonEntity } from '../../database/entity';
import { Repository, DataSource } from 'typeorm';
import { AppDataSource } from 'src/database/connection';

@Injectable()
export class SalonRepo extends Repository<SalonEntity> {
  protected connection = AppDataSource;
  constructor(protected dataSource: DataSource) {
    super(SalonEntity, dataSource.createEntityManager());
  }
}
