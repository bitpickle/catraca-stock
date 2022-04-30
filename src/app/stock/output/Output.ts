import { _BaseEntity } from "src/shared/_BaseEntity";
import { Column, Entity } from "typeorm"
@Entity()
export class Output extends _BaseEntity {

    @Column()
    sku: string

    @Column({
        nullable: true
    })
    amount: number;

}