import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

class ProductType {
    @ApiProperty()
    id: string;

    @ApiProperty()
    amount: number;
}

export class CreateReservationDto {

    @IsInt()
    @ApiProperty()
    timeInHours: number;

    @ApiProperty({type: [ProductType]})
    products: ProductType[]
}