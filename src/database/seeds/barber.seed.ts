import { BarberEntity, SalonEntity } from '../entity';
import { Seed } from './seed';

const barbers: Pick<BarberEntity, 'name' | 'salon'>[] = [
  {
    name: 'Samay',
    salon: { id: '5ba76ae5-3f18-46c0-98db-f584833f7f24' } as SalonEntity,
  },
];

class BarberSeed extends Seed {
  constructor() {
    super();
  }

  async execute() {
    await this.init();
    const manager = this.dataSource.manager.getRepository(BarberEntity);
    const data = await manager.save(barbers);
    return data;
  }
}

export default new BarberSeed();
