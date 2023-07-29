import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentBasic, StudentCourseRegister, StudentLoginInfo } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomStorage } from 'src/common/utils/custome.storage';
import { roleAuthGuardFactory } from 'src/common/utils/guards.stradegey';
import { SaveStudent } from 'src/common/decorators/user.decorator';
import { Student } from './student.entity';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('signup')
  @UseInterceptors(FileInterceptor('image', { storage: CustomStorage.storage }))
  register(
    @Body() dto: StudentBasic,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new NotFoundException('upload image is required');
    }
    return this.studentService.register(dto, file);
  }

  @Post('login')
  login(@Body() dto: StudentLoginInfo) {
    return this.studentService.login(dto);
  }

  @Post('course_register')
  @UseGuards(roleAuthGuardFactory('student'))
  courseRegister(
    @Body() dto: StudentCourseRegister,
    @SaveStudent() student: Student,
  ) {
    return this.studentService.registerCourse(dto, student.id);
  }

  @Get('exams')
  @UseGuards(roleAuthGuardFactory('student'))
  getMyExams(@SaveStudent() student: Student) {
    return this.studentService.getStudentExams(student);
  }
}
