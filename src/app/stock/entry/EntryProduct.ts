import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Entry } from "../entry/Entry";

@Entity()
export class EntryProduct {
    @PrimaryGeneratedColumn()
    public id?: number;

    @ManyToOne(() => Entry, entry => entry.entryProduct)
    public entry?: Entry;

    @Column({
        nullable: false
    })
    public sku: string;

    @Column({
        nullable: false
    })
    public amount: number;
}