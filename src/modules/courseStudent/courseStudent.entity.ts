import { Column, Table,Model, ForeignKey } from "sequelize-typescript";
import { Course } from "../course/course.entity";
import { Student } from "../student/student.entity";

@Table
export class CourseStudent extends Model{
    @Column({allowNull:false,autoIncrement:true,primaryKey: true})
    id:number

    @ForeignKey(() => Course)
    @Column
    courseId: number;

    @ForeignKey(() => Student)
    @Column
    studentId: number;
}