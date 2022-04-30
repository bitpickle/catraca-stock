import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive } from "class-validator";
import { ProductType } from "src/shared/Types";

export class CreateReservationDto {

    @IsPositive()
    @IsNotEmpty()
    @ApiProperty()
    timeInHours: number;

    @ApiProperty({type: [ProductType]})
    products: ProductType[]
}