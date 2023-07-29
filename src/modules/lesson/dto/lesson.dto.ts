import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateLessonDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsUrl()
  videoUrl: string;

  @IsNotEmpty()
  courseId: string | number;
}

export class UpdateLessonDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsUrl()
  videoUrl: string;
}
