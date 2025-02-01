import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../database/entity';
import { Repository, DataSource } from 'typeorm';
import { AppDataSource } from 'src/database/connection';

@Injectable()
export class UserRepo extends Repository<UserEntity> {
  protected connection = AppDataSource;
  constructor(protected dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
}
