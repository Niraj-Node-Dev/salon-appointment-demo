import { SalonRepo } from './../repo';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSalonDto, SearchSalonDto } from './dto';
import { SalonEntity } from 'src/database/entity';

@Injectable()
export class SalonsService {
  constructor(private readonly salonRepo: SalonRepo) {}

  async create(createSalonDto: CreateSalonDto): Promise<SalonEntity> {
    const salon = await this.salonRepo.findOne({
      where: { name: createSalonDto.name },
    });

    if (salon) {
      throw new ConflictException('Salon already exists');
    }

    const newSalon = this.salonRepo.save(createSalonDto);

    return newSalon;
  }

  async findSalonsNearby(dto: SearchSalonDto): Promise<SalonEntity[]> {
    const { latitude, longitude, radius } = dto;

    const res = await this.salonRepo
      .createQueryBuilder('salon')
      .where(
        `ST_DWithin(
          ST_MakePoint(salon.longitude, salon.latitude)::geography,
          ST_MakePoint(:longitude, :latitude)::geography,
          :radius
        )`,
        { longitude, latitude, radius },
      )
      .getMany();

    return res;
  }

  async findOne(id: string) {
    const salon = await this.salonRepo.findOne({
      where: { id },
    });

    if (!salon) {
      throw new NotFoundException('Salon not exists');
    }
    return salon;
  }

  async getServiceBySalonId(id: string) {
    const service = await this.salonRepo.findOne({
      where: { id },
      relations: ['serviceTypes'],
    });

    return service;
  }
}
