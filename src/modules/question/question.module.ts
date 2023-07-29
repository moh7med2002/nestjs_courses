import { Module } from '@nestjs/common';
import repositories from 'src/common/constants/repositories';
import { Question } from './question.entity';
import { QuestionService } from './question.service';
import { AnswerModule } from '../answer/Answer.module';
import { QuestionController } from './question.controller';

@Module({
  imports: [AnswerModule],
  providers: [
    {
      provide: repositories.QuestionRepo,
      useValue: Question,
    },
    QuestionService,
  ],
  controllers: [QuestionController],
})
export class QuestionModule {}
