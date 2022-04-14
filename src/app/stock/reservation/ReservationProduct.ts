import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../product/Product";
import { Reservation } from "../reservation/Reservation";

@Entity()
export class ReservationProduct {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public amount: number;

    @ManyToOne(() => Reservation, reservation => reservation.reservationProduct,{onDelete: 'CASCADE'})
    public reservation?: Reservation;

    @ManyToOne(() => Product, product => product.reservationProduct, {eager:true})
    public product!: Product;
}