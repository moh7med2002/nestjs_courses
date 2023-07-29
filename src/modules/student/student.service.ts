import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import repositories from 'src/common/constants/repositories';
import { Student } from './student.entity';
import { StudentBasic, StudentCourseRegister, StudentLoginInfo } from './dto';
import { comparePassword, hashPassword } from 'src/common/utils/password';
import { createToken } from 'src/common/utils/createToken';
import { CourseService } from '../course/courses.service';
import { Course } from '../course/course.entity';
import { Grade } from '../grade/grade.entity';

@Injectable()
export class StudentService {
  constructor(
    @Inject(repositories.studentRepo)
    private studentRepository: typeof Student,
  ) {}

  async register(
    dto: StudentBasic,
    file: Express.Multer.File,
  ): Promise<{ msg: string }> {
    const { password, email, name } = dto;
    const student = await this.studentRepository.findOne({ where: { email } });
    if (student) {
      throw new BadRequestException('email is found');
    }
    const hasPassword = await hashPassword(password);
    await this.studentRepository.create({
      image: file.filename,
      password: hasPassword,
      email,
      name,
    });
    return { msg: "'your account has been created'" };
  }

  async login(
    dto: StudentLoginInfo,
  ): Promise<{ msg: string; student: Student; token: string }> {
    const { email } = dto;
    const student = await this.studentRepository
      .scope('withoutTimeStamps')
      .findOne({ where: { email } });
    if (!student) {
      throw new ForbiddenException('Email is wrong');
    }
    const isMatch = await comparePassword(dto.password, student.password);
    if (!isMatch) {
      throw new ForbiddenException('password is wrong');
    }
    const access_token = createToken(student.id, 'student');
    const { password, ...other } = student.toJSON();
    return {
      msg: 'success login',
      student: other,
      token: access_token,
    };
  }

  async registerCourse(dto: StudentCourseRegister, studentId: number) {
    const course = await CourseService.courseById(dto.courseId);
    const student = await StudentService.findStudent(studentId);
    // await StudentService.checkCanCourseRegister(course.id, student);
    await student.$add('courses', course);
    return { msg: 'register course success' };
  }

  static async findStudent(id) {
    const student = await Student.findByPk(id);
    if (!student) {
      throw new NotFoundException('student is not found');
    }
    return student;
  }

  static async checkCanCourseRegister(courseId, student: Student) {
    const isRegister = (
      await student.$get('courses', { where: { id: courseId } })
    ).length;
    if (isRegister !== 0) {
      throw new BadRequestException('you already register course');
    }
    return true;
  }

  async getStudentExams(student: Student) {
    const exams = await student.$get('exams', {
      attributes: ['id', 'title', 'period', 'quesions_number'],
      include: [
        {
          model: Course,
          attributes: ['id', 'title'],
        },
      ],
    });
    return { msg: 'success', exams };
  }

  static async checkIsCourseRegister(courseId, student: Student) {
    const isRegister = (
      await student.$get('courses', { where: { id: courseId } })
    ).length;
    if (isRegister === 0) {
      throw new BadRequestException('you not register this course');
    }
    return true;
  }
}
