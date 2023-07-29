import {
  Controller,
  Post,
  Body,
  UseGuards,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { roleAuthGuardFactory } from 'src/common/utils/guards.stradegey';
import { ExamService } from './exam.service';
import { CreateExamDto, ExamMarkDto, UpdateExamDto } from './dto';
import { SaveStudent } from 'src/common/decorators/user.decorator';
import { Student } from '../student/student.entity';

@Controller('exam')
export class ExamController {
  constructor(private examService: ExamService) {}

  @Post('create')
  @UseGuards(roleAuthGuardFactory('admin'))
  createExam(@Body() dto: CreateExamDto) {
    return this.examService.createExam(dto);
  }

  @Put(':examId')
  @UseGuards(roleAuthGuardFactory('admin'))
  updateExam(@Body() dto: UpdateExamDto, @Param('examId') examId: string) {
    return this.examService.updateExam(dto, examId);
  }

  @Get(':examId')
  @UseGuards(roleAuthGuardFactory('student'))
  getExamForStudent(
    @Param('examId') examId: string,
    @SaveStudent() student: Student,
  ) {
    return this.examService.getExamForStudent(examId, student);
  }

  @Post('mark')
  @UseGuards(roleAuthGuardFactory('student'))
  markExamForStudent(
    @Body() dto: ExamMarkDto,
    @SaveStudent() student: Student,
  ) {
    return this.examService.markExam(dto, student);
  }

  @Delete(':examId')
  @UseGuards(roleAuthGuardFactory('admin'))
  deleteExam(@Param('examId') examId: string) {
    return this.examService.deleteExam(examId);
  }
}
