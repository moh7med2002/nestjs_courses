import { Module } from '@nestjs/common';
import repositories from 'src/common/constants/repositories';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

@Module({
  providers: [
    {
      provide: repositories.studentRepo,
      useValue: Student,
    },
    StudentService,
  ],
  controllers: [StudentController],
})
export class StudentModule {}
