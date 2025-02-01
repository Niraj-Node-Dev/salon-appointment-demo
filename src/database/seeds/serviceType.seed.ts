import { SalonEntity, ServiceTypeEntity } from '../entity';
import { Seed } from './seed';

const serviceType: Pick<ServiceTypeEntity, 'name' | 'duration' | 'salon'>[] = [
  {
    name: 'Hair cut',
    duration: 30,
    salon: { id: '5ba76ae5-3f18-46c0-98db-f584833f7f24' } as SalonEntity,
  },
  {
    name: 'Shaving',
    duration: 20,
    salon: { id: '5ba76ae5-3f18-46c0-98db-f584833f7f24' } as SalonEntity,
  },
];

class serviceTypeSeed extends Seed {
  constructor() {
    super();
  }

  async execute() {
    await this.init();
    const manager = this.dataSource.manager.getRepository(ServiceTypeEntity);
    const data = await manager.save(serviceType);
    return data;
  }
}

export default new serviceTypeSeed();
