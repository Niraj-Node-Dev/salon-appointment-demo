import { SalonEntity } from '../entity';
import { Seed } from './seed';

const salons: Pick<
  SalonEntity,
  'id' | 'name' | 'latitude' | 'longitude' | 'address'
>[] = [
  {
    id: '5ba76ae5-3f18-46c0-98db-f584833f7f24',
    name: 'Salon A',
    latitude: 23.0225,
    longitude: 72.5714,
    address: '123, Ahmedabad.',
  },
  {
    id: '15419685-abdf-4882-8a9c-72e6e3f1c2b2',
    name: 'Salon B',
    latitude: 23.03,
    longitude: 72.58,
    address: '234, Ahmedabad.',
  },
  {
    id: '5a3dde68-a7e7-4f56-81da-6334548a689e',
    name: 'Salon C',
    latitude: 23.015,
    longitude: 72.565,
    address: '345, Ahmedabad.',
  },
];

class SalonSeed extends Seed {
  constructor() {
    super();
  }

  async execute() {
    await this.init();

    const manager = this.dataSource.manager.getRepository(SalonEntity);
    const data = await manager.save(salons);

    return data;
  }
}

export default new SalonSeed();
