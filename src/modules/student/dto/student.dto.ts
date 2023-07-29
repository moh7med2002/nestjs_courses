import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class StudentBasic {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  password: string;
}

export class StudentLoginInfo {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  password: string;
}

export class StudentCourseRegister {
  @IsNotEmpty()
  courseId: string | number;
}
