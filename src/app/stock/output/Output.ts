import { _BaseEntity } from "src/shared/_BaseEntity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Product } from "../product/Product";

@Entity()
export class Output extends _BaseEntity {

    @ManyToOne(() => Product, product => product.outputs,{eager:true})
    product: Product

    @Column({
        nullable: true
    })
    amount: number;

}