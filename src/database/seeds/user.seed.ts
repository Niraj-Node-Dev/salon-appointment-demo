import { UserEntity } from '../entity';
import { Seed } from './seed';

const users: Pick<UserEntity, 'name' | 'email' | 'mobile'>[] = [
  {
    name: 'Swapnil',
    email: 'pm@devstree.com',
    mobile: '1231231231',
  },
  {
    name: 'Palak',
    email: 'hr@devstree.com',
    mobile: '1231221441',
  },
];

class UserSeed extends Seed {
  constructor() {
    super();
  }

  async execute() {
    await this.init();
    const manager = this.dataSource.manager.getRepository(UserEntity);
    const data = await manager.upsert(users, {
      conflictPaths: ['email'],
      skipUpdateIfNoValuesChanged: true,
    });
    return data;
  }
}

export default new UserSeed();
