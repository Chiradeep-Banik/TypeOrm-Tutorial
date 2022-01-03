import { Column, BaseEntity, Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn, } from 'typeorm';
import { Client } from './Client';

export enum TransactionsType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw'
}

@Entity('transaction')
export class Transaction extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'enum',
        enum: TransactionsType
    })
    type!: string

    @Column({
        type: 'numeric'
    })
    amount!: number

    @ManyToOne(
        () => Client,
        Client => Client.transactions
    )
    @JoinColumn({
        name: 'clientId'
    })
    client!: Client
}

