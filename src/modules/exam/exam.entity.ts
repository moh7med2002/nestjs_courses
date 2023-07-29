import {
  Column,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Course } from '../course/course.entity';
import { Question } from '../question/question.entity';
import { DataTypes } from 'sequelize';
import { Student } from '../student/student.entity';
import { Grade } from '../grade/grade.entity';

@Table
export class Exam extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ allowNull: false })
  title: string;

  @Column({ allowNull: false, type: DataTypes.INTEGER })
  period: number;

  @Column({ allowNull: false, type: DataTypes.INTEGER })
  quesions_number: number;

  @ForeignKey(() => Course)
  @Column({ allowNull: false })
  courseId: number;

  @BelongsTo(() => Course)
  course: Course;

  @HasMany(() => Question)
  questions: Question[];

  @BelongsToMany(() => Student, () => Grade)
  students: Student[];
}
