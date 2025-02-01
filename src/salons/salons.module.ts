import { Module } from '@nestjs/common';
import { SalonsService } from './salons.service';
import { SalonsController } from './salons.controller';
import { SalonRepo } from 'src/repo';

@Module({
  controllers: [SalonsController],
  providers: [SalonsService, SalonRepo],
})
export class SalonsModule {}
