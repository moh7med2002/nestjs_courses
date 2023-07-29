import { Module } from '@nestjs/common';
import repositories from 'src/common/constants/repositories';
import { Department } from './department.entity';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.contoller';

@Module({
  providers: [
    {
      provide: repositories.departmentRepo,
      useValue: Department,
    },
    DepartmentService,
  ],
  controllers: [DepartmentController],
  exports: [repositories.departmentRepo],
})
export class DepartmentModule {}
