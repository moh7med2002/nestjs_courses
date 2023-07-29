import { Column, Table,Model, ForeignKey, BelongsTo} from "sequelize-typescript";
import { Question } from "../question/question.entity";
import { Grade } from "../grade/grade.entity";
import { Answer } from "../answer/Answer.entity";

@Table
export class GradeAnswer extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number
    
    @ForeignKey(()=>Question)
    @Column({allowNull:false})
    questionId:number

    @BelongsTo(()=>Question)
    question:Question

    @ForeignKey(()=>Grade)
    @Column({allowNull:false})
    gradeId:number

    @BelongsTo(()=>Grade)
    grade:Grade

    @ForeignKey(()=>Answer)
    @Column({allowNull:false})
    answerId:number

    @BelongsTo(()=>Answer)
    answer:Answer
}