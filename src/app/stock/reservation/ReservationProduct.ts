import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reservation } from "../reservation/Reservation";

@Entity()
export class ReservationProduct {
    @PrimaryGeneratedColumn()
    public id?: number;

    @ManyToOne(() => Reservation, reservation => reservation.reservationProduct,{onDelete: 'CASCADE'})
    public reservation?: Reservation;

    @Column({
        nullable: false
    })
    public sku: string;

    @Column({
        nullable: false
    })
    public amount: number;
    
    }