import {
  Controller,
  Post,
  Body,
  UseGuards,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { roleAuthGuardFactory } from 'src/common/utils/guards.stradegey';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/question.dto';

@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Post('create')
  @UseGuards(roleAuthGuardFactory('admin'))
  createQuestion(@Body() dto: CreateQuestionDto) {
    return this.questionService.createQuestion(dto);
  }

  @Delete(':questionId')
  @UseGuards(roleAuthGuardFactory('admin'))
  deleteQuestion(@Param('questionId') questionId: string) {
    return this.questionService.deleteQuestion(questionId);
  }
}
