import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany } from 'typeorm';
import { Banker } from './Banker';
import { Transaction } from './Transaction';
import { Person } from './utils/Person';

@Entity('client')
export class Client extends Person {

    @Column({
        type: 'numeric'
    })
    balance!: number;

    @Column({
        default: true
    })
    isActive!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    UpdatedAt!: Date;

    @OneToMany(
        () => Transaction,
        Transaction => Transaction.client
    )
    transactions!: Transaction[]

    @ManyToMany(
        () => Banker
    )
    bankers!: Banker[]
}

