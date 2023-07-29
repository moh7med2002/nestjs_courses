import { Column, Table,Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Course } from "../course/course.entity";

@Table
export class Lesson extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @Column({allowNull:false})
    title: string;

    @Column({allowNull:false})
    videoUrl: string;

    @ForeignKey(()=>Course)
    @Column({allowNull:false})
    courseId:number

    @BelongsTo(()=>Course)
    course:Course
}