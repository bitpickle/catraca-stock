import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from "class-validator";

export class CreateOutputDto {
    @ApiProperty()
    sku: string;
    
    @ApiProperty()
    @IsNumber()
    amount: number;

}