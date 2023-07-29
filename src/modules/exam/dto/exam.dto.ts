import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

export class CreateExamDto {
  @IsNotEmpty()
  courseId: string | number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  period: number;

  @IsNotEmpty()
  @IsNumber()
  quesions_number: number;
}

export class UpdateExamDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  period: number;

  @IsNotEmpty()
  @IsNumber()
  quesions_number: number;
}

class Answer {
  @IsNotEmpty({ message: 'Answer Id cannot be empty.' })
  aId: string | number;

  @IsNotEmpty({ message: 'Question Id cannot be empty.' })
  qId: string | number;
}

export class ExamMarkDto {
  @IsNotEmpty()
  examId: string | number;

  @Type(() => Answer)
  @ValidateNested({ each: true })
  answers: Answer[];
}
