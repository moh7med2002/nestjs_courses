import {
  Body,
  Controller,
  Post,
  UseGuards,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { roleAuthGuardFactory } from 'src/common/utils/guards.stradegey';
import { DepartmentInfo } from './dto/department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Post('create')
  @UseGuards(roleAuthGuardFactory('admin'))
  create(@Body() dto: DepartmentInfo) {
    return this.departmentService.createDepartment(dto);
  }

  @Put(':depId')
  @UseGuards(roleAuthGuardFactory('admin'))
  update(@Body() dto: DepartmentInfo, @Param('depId') depId: string) {
    return this.departmentService.updateDepartment(dto, depId);
  }

  @Delete(':depId')
  @UseGuards(roleAuthGuardFactory('admin'))
  delete(@Param('depId') depId: string) {
    return this.departmentService.deleteDepartment(depId);
  }

  @Get('all')
  getAll() {
    return this.departmentService.fetchAll();
  }

  @Get(':depId')
  getOne(@Param('depId') depId: string) {
    return this.departmentService.fetchById(depId);
  }
}
