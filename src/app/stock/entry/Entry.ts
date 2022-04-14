import { _BaseEntity } from "src/shared/_BaseEntity";
import { Column, Entity, OneToMany } from "typeorm";
import { EntryProduct } from "./EntryProduct";

@Entity()
export class Entry extends _BaseEntity {

    @Column({
        nullable: false
    })
    nf: string;

    @OneToMany(() => EntryProduct, entryProduct => entryProduct.entry, { eager: true })
    public entryProduct!: EntryProduct[];

}