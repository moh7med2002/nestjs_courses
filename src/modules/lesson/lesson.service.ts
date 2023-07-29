import {
  Injectable,
  Inject,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import repositories from 'src/common/constants/repositories';
import { Lesson } from './lesson.entity';
import { CreateLessonDto, UpdateLessonDto } from './dto';
import { CourseService } from '../course/courses.service';

@Injectable()
export class LessonService {
  constructor(
    @Inject(repositories.lessonRepo)
    private lessonRepository: typeof Lesson,
  ) {}

  async createLesson(dto: CreateLessonDto) {
    await CourseService.courseById(dto.courseId);
    await this.lessonRepository.create({
      ...dto,
    });
    return { msg: 'lesson has been created' };
  }

  async updatelesson(dto: UpdateLessonDto, lessonId: string) {
    const lesson = await this.findLessonById(lessonId);
    lesson.title = dto.title;
    lesson.videoUrl = dto.videoUrl;
    await lesson.save();
    return { msg: 'lesson has been updated' };
  }

  async deletelesson(lessonId: string) {
    const lesson = await this.findLessonById(lessonId);
    await lesson.destroy();
    return { msg: 'lesson has been deleted' };
  }

  async findLessonById(lessonId) {
    const lessson = await this.lessonRepository.findByPk(lessonId);
    if (!lessson) {
      throw new NotFoundException('Invalid lesson id');
    }
    return lessson;
  }
}
