import { Module } from '@nestjs/common';
import repositories from 'src/common/constants/repositories';
import { GradeAnswer } from './gradeAnswer.entity';

@Module({
    providers: [
        {
        provide:repositories.gradeAnswerRepo,
        useValue:GradeAnswer
        },
    ],
})
export class GradeAnswerModule {}
