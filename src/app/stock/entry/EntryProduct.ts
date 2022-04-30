import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Entry } from "../entry/Entry";

@Entity()
export class EntryProduct {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public amount: number;

    @ManyToOne(() => Entry, entry => entry.entryProduct)
    public entry?: Entry;

    @Column()
    sku: string;
}