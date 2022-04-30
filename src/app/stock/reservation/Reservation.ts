import { _BaseEntity } from "src/shared/_BaseEntity";
import { Column, Entity, OneToMany } from "typeorm";
import { ReservationProduct } from "./ReservationProduct";

@Entity()
export class Reservation extends _BaseEntity {

    @Column({
        nullable: false
    })
    public validUntil: Date;

    @OneToMany(() => ReservationProduct, reservationProduct => reservationProduct.reservation, { eager: true, cascade:true})
    public reservationProduct!: ReservationProduct[];

}