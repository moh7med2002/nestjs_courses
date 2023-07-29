import { Module } from '@nestjs/common';
import repositories from 'src/common/constants/repositories';
import { Exam } from './exam.entity';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { AnswerModule } from '../answer/Answer.module';

@Module({
  imports: [AnswerModule],
  providers: [
    {
      provide: repositories.ExamRepo,
      useValue: Exam,
    },
    ExamService,
  ],
  controllers: [ExamController],
})
export class ExamModule {}
