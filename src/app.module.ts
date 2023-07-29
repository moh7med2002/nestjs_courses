import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { CustomStorage } from './common/utils/custome.storage';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './modules/admin/admin.module';
import { DepartmentModule } from './modules/department/department.module';
import { CourseModule } from './modules/course/course.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { ExamModule } from './modules/exam/exam.module';
import { QuestionModule } from './modules/question/question.module';
import { AnswerModule } from './modules/answer/Answer.module';
import { StudentModule } from './modules/student/student.module';
import { CourseStudentModule } from './modules/courseStudent/courseStudent.module';
import { GradeModule } from './modules/grade/grade.module';
import { GradeAnswerModule } from './modules/gradeAnswer/gradeAnswer.module';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: CustomStorage.storage,
    }),
    }),
    DatabaseModule,
    AdminModule,
    DepartmentModule,
    CourseModule,
    LessonModule,
    ExamModule,
    QuestionModule,
    AnswerModule,
    StudentModule,
    CourseStudentModule,
    GradeModule,
    GradeAnswerModule,
    JwtModule.register({global:true,secret:'token'})],
})
export class AppModule {}
