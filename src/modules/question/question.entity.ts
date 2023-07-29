import { Column, Table,Model, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Exam } from "../exam/exam.entity";
import { Answer } from "../answer/Answer.entity";
import { GradeAnswer } from "../gradeAnswer/gradeAnswer.entity";

@Table
export class Question extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @Column({allowNull:false})
    title: string;

    @ForeignKey(()=>Exam)
    @Column({allowNull:false})
    examId:number

    @BelongsTo(()=>Exam)
    exam:Exam

    @HasMany(()=>Answer)
    asnwers:Answer[]

    @HasMany(()=>GradeAnswer)
    gradeAnswers:GradeAnswer[]
}