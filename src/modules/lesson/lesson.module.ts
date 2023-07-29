import { Module } from '@nestjs/common';
import repositories from 'src/common/constants/repositories';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';

@Module({
  providers: [
    {
      provide: repositories.lessonRepo,
      useValue: Lesson,
    },
    LessonService,
  ],
  controllers: [LessonController],
})
export class LessonModule {}
