import { Module } from '@nestjs/common';
import repositories from 'src/common/constants/repositories';
import { Answer } from './Answer.entity';

@Module({
  providers: [
    {
      provide: repositories.answerRepo,
      useValue: Answer,
    },
  ],
  exports: [repositories.answerRepo],
})
export class AnswerModule {}
