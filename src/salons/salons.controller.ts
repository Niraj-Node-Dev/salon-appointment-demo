import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { SalonsService } from './salons.service';
import { CreateSalonDto, SearchSalonDto } from './dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('salons')
export class SalonsController {
  constructor(private readonly salonsService: SalonsService) {}

  @ApiOperation({ summary: 'Create new salon' })
  @Post()
  create(@Body() createSalonDto: CreateSalonDto) {
    return this.salonsService.create(createSalonDto);
  }

  @ApiOperation({ summary: 'Get salons nearby' })
  @Get('search')
  findSalonsNearby(@Query() searchSalonDto: SearchSalonDto) {
    return this.salonsService.findSalonsNearby(searchSalonDto);
  }

  @ApiOperation({ summary: 'Get salon by id' })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.salonsService.findOne(id);
  }

  @ApiOperation({ summary: 'Get services by salon id' })
  @Get('service/:id')
  getServiceBySalonId(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.salonsService.getServiceBySalonId(id);
  }
}
