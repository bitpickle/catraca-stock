import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateOutputDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    sku: string;
    
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    amount: number;
}