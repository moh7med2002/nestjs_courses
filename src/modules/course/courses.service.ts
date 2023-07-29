import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import repositories from 'src/common/constants/repositories';
import { Course } from './course.entity';
import { CourseCreateDto, CourseUpdateDto } from './dto';
import { DepartmentService } from '../department/department.service';
import { clearImage } from 'src/common/utils/claerImage';
import { Student } from '../student/student.entity';
import { StudentService } from '../student/student.service';

@Injectable()
export class CourseService {
  constructor(
    @Inject(repositories.courseRepo)
    private courseRepository: typeof Course,
  ) {}

  async createCourse(dto: CourseCreateDto, image: string) {
    await DepartmentService.fetchById(dto.departmentId);
    await this.courseRepository.create({
      title: dto.title,
      description: dto.description,
      departmentId: dto.departmentId,
      image,
    });
    return { msg: 'create course success' };
  }

  async updateCourse(dto: CourseUpdateDto, courseId: string, image?: string) {
    const course = await CourseService.courseById(courseId);
    course.title = dto.title;
    course.description = dto.description;
    if (image) {
      clearImage(course.image);
      course.image = image;
    }
    await course.save();
    return { msg: 'course updated' };
  }

  async deleteCourse(courseId: string) {
    const course = await CourseService.courseById(courseId);
    clearImage(course.image);
    await course.destroy();
    return { msg: 'course has been deleted' };
  }

  async getCourseForStudent(courseId: string, student: Student) {
    await StudentService.checkIsCourseRegister(courseId, student);
    const course = await this.courseRepository.findByPk(courseId);
    return { course };
  }

  async fetchAll() {
    const courses = await this.courseRepository.findAll({
      include: { all: true },
    });
    return { courses };
  }

  static async courseById(id) {
    const course = await Course.findByPk(id);
    if (!course) {
      throw new NotFoundException('invalid course id');
    }
    return course;
  }
}
