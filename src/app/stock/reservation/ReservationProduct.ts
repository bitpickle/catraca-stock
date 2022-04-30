import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "../reservation/Reservation";

@Entity()
export class ReservationProduct {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public amount: number;

    @ManyToOne(() => Reservation, reservation => reservation.reservationProduct,{onDelete: 'CASCADE'})
    public reservation?: Reservation;

    @Column()
    public sku?: string;
    
    }