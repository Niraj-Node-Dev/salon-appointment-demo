import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { AppDataSource } from 'src/database/connection';
import { ServiceTypeEntity } from 'src/database/entity';

@Injectable()
export class ServiceTypeRepo extends Repository<ServiceTypeEntity> {
  protected connection = AppDataSource;
  constructor(protected dataSource: DataSource) {
    super(ServiceTypeEntity, dataSource.createEntityManager());
  }
}
