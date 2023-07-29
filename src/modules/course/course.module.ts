import { Module } from '@nestjs/common';
import repositories from 'src/common/constants/repositories';
import { Course } from './course.entity';
import { CourseService } from './courses.service';
import { CourseController } from './course.controller';

@Module({
  providers: [
    {
      provide: repositories.courseRepo,
      useValue: Course,
    },
    CourseService,
  ],
  controllers: [CourseController],
})
export class CourseModule {}
