import {
  Column,
  Table,
  Model,
  BelongsToMany,
  Scopes,
} from 'sequelize-typescript';
import { Course } from '../course/course.entity';
import { CourseStudent } from '../courseStudent/courseStudent.entity';
import { Exam } from '../exam/exam.entity';
import { Grade } from '../grade/grade.entity';

@Table
@Scopes(() => ({
  withoutTimeStamps: {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  },
  withoutPassword: {
    attributes: { exclude: ['password', 'updatedAt', 'createdAt'] },
  },
}))
export class Student extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: false })
  image: string;

  @BelongsToMany(() => Course, () => CourseStudent)
  courses: Course[];

  @BelongsToMany(() => Exam, () => Grade)
  exams: Exam[];
}
