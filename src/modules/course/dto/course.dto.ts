import { IsNotEmpty } from 'class-validator';

export class CourseCreateDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  departmentId: string | number;
}

export class CourseUpdateDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
