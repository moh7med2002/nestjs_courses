import { Module } from '@nestjs/common';
import repositories from 'src/common/constants/repositories';
import { Grade } from './grade.entity';

@Module({
  providers: [
    {
      provide: repositories.gradeRepo,
      useValue: Grade,
    },
  ],
})
export class GradeModule {}
