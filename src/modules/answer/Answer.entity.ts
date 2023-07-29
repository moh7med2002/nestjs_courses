import { Column, Table,Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Course } from "../course/course.entity";
import { Question } from "../question/question.entity";

@Table
export class Answer extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @Column({allowNull:false})
    title: string;

    @Column({allowNull:false})
    isRight: boolean;

    @ForeignKey(()=>Question)
    @Column({allowNull:false})
    questionId:number

    @BelongsTo(()=>Question)
    question:Question
}