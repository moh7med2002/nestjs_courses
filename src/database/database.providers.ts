import { Sequelize } from 'sequelize-typescript';
import { Admin } from 'src/modules/admin/admin.entity';
import { Answer } from 'src/modules/answer/Answer.entity';
import { Course } from 'src/modules/course/course.entity';
import { CourseStudent } from 'src/modules/courseStudent/courseStudent.entity';
import { Department } from 'src/modules/department/department.entity';
import { Exam } from 'src/modules/exam/exam.entity';
import { Grade } from 'src/modules/grade/grade.entity';
import { GradeAnswer } from 'src/modules/gradeAnswer/gradeAnswer.entity';
import { Lesson } from 'src/modules/lesson/lesson.entity';
import { Question } from 'src/modules/question/question.entity';
import { Student } from 'src/modules/student/student.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '059283805928388',
        database: 'education_db',
      });
      sequelize.addModels([
        Admin,
        Department,
        Course,
        Lesson,
        Exam,
        Question,
        Answer,
        Student,
        CourseStudent,
        Grade,
        GradeAnswer,
      ]);
      await sequelize.sync({ alter: !true });
      return sequelize;
    },
  },
];
