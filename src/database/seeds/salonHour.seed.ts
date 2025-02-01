import { SalonEntity, SalonHoursEntity } from '../entity';
import { Seed } from './seed';

const salonsHours: Pick<
  SalonHoursEntity,
  'day_of_week' | 'opening_time' | 'closing_time' | 'salon'
>[] = [
  {
    day_of_week: 0,
    opening_time: '10:00',
    closing_time: '18:00',
    salon: { id: '5ba76ae5-3f18-46c0-98db-f584833f7f24' } as SalonEntity,
  },
  {
    day_of_week: 1,
    opening_time: '10:00',
    closing_time: '18:00',
    salon: { id: '5ba76ae5-3f18-46c0-98db-f584833f7f24' } as SalonEntity,
  },
  {
    day_of_week: 2,
    opening_time: '10:00',
    closing_time: '18:00',
    salon: { id: '5ba76ae5-3f18-46c0-98db-f584833f7f24' } as SalonEntity,
  },
  {
    day_of_week: 3,
    opening_time: '10:00',
    closing_time: '18:00',
    salon: { id: '5ba76ae5-3f18-46c0-98db-f584833f7f24' } as SalonEntity,
  },
  {
    day_of_week: 4,
    opening_time: '10:00',
    closing_time: '18:00',
    salon: { id: '5ba76ae5-3f18-46c0-98db-f584833f7f24' } as SalonEntity,
  },
  {
    day_of_week: 5,
    opening_time: '10:00',
    closing_time: '18:00',
    salon: { id: '5ba76ae5-3f18-46c0-98db-f584833f7f24' } as SalonEntity,
  },
  {
    day_of_week: 6,
    opening_time: '10:00',
    closing_time: '18:00',
    salon: { id: '5ba76ae5-3f18-46c0-98db-f584833f7f24' } as SalonEntity,
  },
];

class SalonHourSeed extends Seed {
  constructor() {
    super();
  }

  async execute() {
    await this.init();
    const manager = this.dataSource.manager.getRepository(SalonHoursEntity);
    const data = await manager.save(salonsHours);
    return data;
  }
}

export default new SalonHourSeed();
