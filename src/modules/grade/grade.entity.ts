import { Column, Table,Model, ForeignKey, HasMany } from "sequelize-typescript";
import { Student } from "../student/student.entity";
import { Exam } from "../exam/exam.entity";
import { GradeAnswer } from "../gradeAnswer/gradeAnswer.entity";

@Table
export class Grade extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @ForeignKey(() => Exam)
    @Column({allowNull:false})
    examId: number;

    @ForeignKey(() => Student)
    @Column({allowNull:false})
    studentId: number;

    @Column({allowNull:false})
    mark:number

    @HasMany(()=>GradeAnswer)
    answers:GradeAnswer[]
}