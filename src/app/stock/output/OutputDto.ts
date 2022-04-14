import { IsNumber, IsUUID } from "class-validator";

export class CreateOutputDto {

    @IsUUID()
    product: string;

    @IsNumber()
    amount: number;

}