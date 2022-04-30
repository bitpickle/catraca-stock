import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumberString, IsPositive, IsString } from "class-validator";
import { ProductType } from "src/shared/Types";

export class CreateEntryDto {

    @IsNumberString()
    @IsNotEmpty()
    @ApiProperty()
    nf: string;

    @IsArray()
    @ApiProperty({ type: [ProductType] })
    products: ProductType[]

}