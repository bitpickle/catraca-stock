import { IsNotEmpty, IsString } from "class-validator";
import { _BaseEntity } from "src/shared/_BaseEntity";
import { AfterLoad, Column, Entity, OneToMany } from "typeorm";
import { EntryProduct } from "../entry/EntryProduct";
import { Output } from "../output/Output";
import { ReservationProduct } from "../reservation/ReservationProduct";

@Entity()
export class Product extends _BaseEntity {

    @IsNotEmpty()
    @IsString()
    @Column({
        nullable: false
    })
    public sku: string;

    @IsNotEmpty()
    @IsString()
    @Column({
        nullable: false
    })
    public name: string;

    @OneToMany(() => ReservationProduct, reservationProduct => reservationProduct.product,{lazy:true})
    public reservationProduct!: ReservationProduct[];

    @OneToMany(() => EntryProduct, entryProduct => entryProduct.product,{lazy:true})
    public entryProduct!: EntryProduct[];

    @OneToMany(() => Output, output => output.product,{lazy:true})
    public outputs: Output[];

    public total:number;
    
    public totalReservations:number;

    @AfterLoad()
    public async countProducts() {
        let total = 0;
        let totalReservations = 0;

        let entries = await this.entryProduct;
        let outputs = await this.outputs;
        let reservations = await this.reservationProduct;

        if (entries != undefined) {
            for (const p of entries) {
                total += p.amount;
            }
        }

        if (outputs != undefined) {
            for (const p of outputs) {
                total -= p.amount;
            }
        }

        if (reservations != undefined) {
            for (const p of reservations) {
                total -= p.amount;
                totalReservations += p.amount;
            }
        }

        this.totalReservations = totalReservations;
        this.total = total;
    }


}