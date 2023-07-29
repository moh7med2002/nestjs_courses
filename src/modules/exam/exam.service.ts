import {
  Injectable,
  Inject,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import repositories from 'src/common/constants/repositories';
import { Exam } from './exam.entity';
import { CreateExamDto, ExamMarkDto, UpdateExamDto } from './dto';
import { CourseService } from '../course/courses.service';
import { Student } from '../student/student.entity';
import { StudentService } from '../student/student.service';
import { Question } from '../question/question.entity';
import { Answer } from '../answer/Answer.entity';
import { Sequelize } from 'sequelize';
import { Grade } from '../grade/grade.entity';

@Injectable()
export class ExamService {
  constructor(
    @Inject(repositories.ExamRepo)
    private examRepository: typeof Exam,

    @Inject(repositories.answerRepo)
    private answerRepository: typeof Answer,
  ) {}

  async createExam(dto: CreateExamDto) {
    await CourseService.courseById(dto.courseId);
    await this.examRepository.create({
      ...dto,
    });
    return { msg: 'exam has been created' };
  }

  async updateExam(dto: UpdateExamDto, examId: string) {
    const exam = await ExamService.examById(examId);
    exam.title = dto.title;
    exam.period = dto.period;
    exam.quesions_number = dto.quesions_number;
    await exam.save();
    return { msg: 'exam has been updated' };
  }

  async deleteExam(examId: string) {
    const exam = await ExamService.examById(examId);
    await exam.destroy();
    return { msg: 'exam has been deleted' };
  }

  async getExamForStudent(examId: string, student: Student) {
    const exam = await ExamService.examById(examId);
    await StudentService.checkIsCourseRegister(exam.courseId, student);
    const exam_send = await this.examRepository.findOne({
      where: { id: examId },
      include: [
        {
          model: Question,
          include: [
            {
              model: Answer,
              attributes: ['id', 'isRight', 'title'],
              order: Sequelize.fn('RAND'),
              separate: true,
            },
          ],
          limit: exam.quesions_number,
          separate: true,
          order: Sequelize.fn('RAND'),
          attributes: ['id', 'title'],
        },
      ],
    });
    return { exam: exam_send };
  }

  async markExam(dto: ExamMarkDto, student: Student) {
    const exam = await ExamService.examById(dto.examId);
    let totalScore = 0;
    for (const question of dto.answers) {
      const answerData = await this.answerRepository.findByPk(question.aId);
      if (answerData && answerData.isRight) {
        totalScore += 1;
      }
    }
    await student.$add('exams', exam, {
      through: { mark: totalScore },
    });
    return { grade: totalScore, msg: 'success' };
  }

  static async examById(examId) {
    const exam = await Exam.findByPk(examId);
    if (!exam) {
      throw new NotFoundException('Invalid exam id');
    }
    return exam;
  }
}
