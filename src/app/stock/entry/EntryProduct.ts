import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../product/Product";
import { Entry } from "../entry/Entry";

@Entity()
export class EntryProduct {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public amount: number;

    @ManyToOne(() => Entry, entry => entry.entryProduct)
    public entry?: Entry;

    @ManyToOne(() => Product, product => product.entryProduct, { eager:true })
    public product!: Product;
}