import { _BaseEntity } from "src/shared/_BaseEntity";
import { Column, Entity } from "typeorm"
@Entity()
export class Output extends _BaseEntity {

    @Column({
        nullable: false
    })
    sku: string

    @Column({
        nullable: false
    })
    amount: number;

}