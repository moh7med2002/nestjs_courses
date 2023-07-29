import {
  Controller,
  Post,
  Body,
  UseGuards,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { roleAuthGuardFactory } from 'src/common/utils/guards.stradegey';
import { CreateLessonDto, UpdateLessonDto } from './dto';

@Controller('lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @Post('create')
  @UseGuards(roleAuthGuardFactory('admin'))
  createLesson(@Body() dto: CreateLessonDto) {
    return this.lessonService.createLesson(dto);
  }

  @Put(':lessonId')
  @UseGuards(roleAuthGuardFactory('admin'))
  updateLesson(
    @Body() dto: UpdateLessonDto,
    @Param('lessonId') lessonId: string,
  ) {
    return this.lessonService.updatelesson(dto, lessonId);
  }

  @Delete(':lessonId')
  @UseGuards(roleAuthGuardFactory('admin'))
  deleteLesson(@Param('lessonId') lessonId: string) {
    return this.lessonService.deletelesson(lessonId);
  }
}
