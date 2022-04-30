import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsNumberString, IsUUID } from "class-validator";

class ProductType {

    @ApiProperty()
    sku: string;

    @IsNumber()
    @ApiProperty()
    amount: number;

}

export class CreateEntryDto {

    @IsNumberString()
    @ApiProperty()
    nf: string;

    @IsArray()
    @ApiProperty({ type: [ProductType] })
    products: ProductType[]

}