import { Module } from '@nestjs/common';
import repositories from 'src/common/constants/repositories';
import { CourseStudent } from './courseStudent.entity';

@Module({
    providers: [
        {
        provide:repositories.courseStudentRepo,
        useValue:CourseStudent
        },
    ],
})
export class CourseStudentModule {}
