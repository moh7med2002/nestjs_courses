import {
  Body,
  Controller,
  Post,
  UseGuards,
  Put,
  Param,
  Delete,
  Get,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
} from '@nestjs/common';
import { roleAuthGuardFactory } from 'src/common/utils/guards.stradegey';
import { CourseService } from './courses.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomStorage } from 'src/common/utils/custome.storage';
import { CourseCreateDto, CourseUpdateDto } from './dto';
import { SaveStudent } from 'src/common/decorators/user.decorator';
import { Student } from '../student/student.entity';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post('create')
  @UseGuards(roleAuthGuardFactory('admin'))
  @UseInterceptors(FileInterceptor('image', { storage: CustomStorage.storage }))
  createCourse(
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: CourseCreateDto,
  ) {
    if (!image) {
      throw new NotFoundException('upload image is required');
    }
    return this.courseService.createCourse(dto, image.filename);
  }

  @Put(':courseId')
  @UseGuards(roleAuthGuardFactory('admin'))
  @UseInterceptors(FileInterceptor('image', { storage: CustomStorage.storage }))
  updateCourse(
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: CourseUpdateDto,
    @Param('courseId') courseId: string,
  ) {
    if (image) {
      return this.courseService.updateCourse(dto, courseId, image.filename);
    }
    return this.courseService.updateCourse(dto, courseId);
  }

  @Delete(':courseId')
  @UseGuards(roleAuthGuardFactory('admin'))
  deletedCourse(@Param('courseId') courseId: string) {
    return this.courseService.deleteCourse(courseId);
  }

  @Get('all')
  fetchAll() {
    return this.courseService.fetchAll();
  }

  @Get(':courseId')
  @UseGuards(roleAuthGuardFactory('student'))
  fetchSingelCourse(
    @Param('courseId') courseId: string,
    @SaveStudent() student: Student,
  ) {
    return this.courseService.getCourseForStudent(courseId, student);
  }
}
