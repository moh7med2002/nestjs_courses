import { Column, Table,Model } from "sequelize-typescript";

@Table
export class Admin extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @Column
    password: string;

    @Column
    email: string;
}