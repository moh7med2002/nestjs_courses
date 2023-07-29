import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { StudentService } from 'src/modules/student/student.service';

export const SaveStudent = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const payload = request.user;
    const user = await StudentService.findStudent(payload.userId);
    return user;
  },
);
