import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './database/connection';
import { AppointmentsModule } from './appointments/appointments.module';
import { SalonsModule } from './salons/salons.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ormConfig,
    }),
    SalonsModule,
    AppointmentsModule,
    SalonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
