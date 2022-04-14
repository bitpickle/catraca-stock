import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @ApiProperty()
    sku: string;

    @IsNotEmpty()
    @ApiProperty()
    name: string;
}

export class UpdateProductDto {
    @ApiProperty()
    sku?: string;

    @ApiProperty()
    name?: string;
}