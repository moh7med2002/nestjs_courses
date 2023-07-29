import { DataTypes } from 'sequelize';
import {
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Department } from '../department/department.entity';
import { Lesson } from '../lesson/lesson.entity';
import { Exam } from '../exam/exam.entity';
import { Student } from '../student/student.entity';
import { CourseStudent } from '../courseStudent/courseStudent.entity';

@Table
export class Course extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ allowNull: false })
  title: string;

  @Column({ allowNull: false })
  image: string;

  @Column({ allowNull: false, type: DataTypes.TEXT })
  description: string;

  @ForeignKey(() => Department)
  @Column({})
  departmentId: number;

  @BelongsTo(() => Department, { onDelete: 'NO ACTION' })
  departmanet: Department;

  @HasMany(() => Lesson)
  lessons: Lesson[];

  @HasMany(() => Exam)
  exams: Exam[];

  @BelongsToMany(() => Student, () => CourseStudent)
  students: Student[];
}
