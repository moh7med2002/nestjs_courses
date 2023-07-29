import {
  Column,
  Table,
  Model,
  HasMany,
  Scopes,
  DefaultScope,
} from 'sequelize-typescript';
import { Course } from '../course/course.entity';

@Table({ paranoid: true })
@Scopes(() => ({
  withoutTimeStamps: {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  },
}))
export class Department extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @Column
  title: string;

  @HasMany(() => Course)
  courses: Course[];
}
