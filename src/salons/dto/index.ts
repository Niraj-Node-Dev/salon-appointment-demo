import { ApiProperty } from '@nestjs/swagger';
export class CreateSalonDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  @ApiProperty()
  address: string;
}

export class SearchSalonDto {
  @ApiProperty()
  latitude: number;

  @ApiProperty()
  longitude: number;

  @ApiProperty()
  radius: number;
}
