import {
  Injectable,
  Inject,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import repositories from 'src/common/constants/repositories';
import { Question } from './question.entity';
import { Answer } from '../answer/Answer.entity';
import { CreateQuestionDto } from './dto/question.dto';
import { ExamService } from '../exam/exam.service';

@Injectable()
export class QuestionService {
  constructor(
    @Inject(repositories.QuestionRepo)
    private questionRepository: typeof Question,
    @Inject(repositories.answerRepo)
    private answerRepository: typeof Answer,
  ) {}

  async createQuestion(dto: CreateQuestionDto) {
    const right_answer_count = dto.answers.filter((an) => an.isRight).length;
    if (right_answer_count !== 1) {
      throw new BadRequestException('only one right answer valid');
    }
    await ExamService.examById(dto.examId);
    const question = await this.questionRepository.create({
      examId: dto.examId,
      title: dto.questionTitle,
    });
    const answerCreationPromises = dto.answers.map(async (answer) => {
      await this.answerRepository.create({
        questionId: question.id,
        title: answer.title,
        isRight: answer.isRight,
      });
    });
    // Execute all answer creation promises in parallel
    await Promise.all(answerCreationPromises);
    return { msg: 'success' };
  }

  async deleteQuestion(questionId: string) {
    await this.questionRepository.destroy({ where: { id: questionId } });
    return { msg: 'question has been deleted' };
  }
}
