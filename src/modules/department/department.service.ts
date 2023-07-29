import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import repositories from 'src/common/constants/repositories';
import { Department } from './department.entity';
import { DepartmentInfo } from './dto/department.dto';
import { Op } from 'sequelize';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject(repositories.departmentRepo)
    private departmentRepository: typeof Department,
  ) {}

  async createDepartment(dto: DepartmentInfo) {
    const dept_with_title = await this.departmentRepository.findOne({
      where: { title: dto.title },
    });
    if (dept_with_title) {
      throw new BadRequestException('this department already found');
    }
    const department = await this.departmentRepository.create({
      title: dto.title,
    });
    return { msg: 'success', department };
  }

  async updateDepartment(dto: DepartmentInfo, depId: string | number) {
    const dept_with_title = await this.departmentRepository.findOne({
      where: { id: { [Op.ne]: depId }, title: dto.title },
    });
    if (dept_with_title) {
      throw new BadRequestException('this department already found');
    }
    const department = await this.departmentRepository.findByPk(depId);
    if (!department) {
      throw new NotFoundException('DEPARTMENT NOT FOUND');
    }
    department.title = dto.title;
    await department.save();
    return { msg: 'success' };
  }

  async deleteDepartment(depId: string) {
    // await this.departmentRepository.destroy({ where: { id: depId } });
    const department = await Department.findByPk(depId);
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    // Soft delete the department using the `destroy` method
    await department.destroy();
    return { msg: 'success' };
  }

  async fetchAll() {
    const departments = await this.departmentRepository.findAll();
    return { departments };
  }

  async fetchById(depId: string) {
    const department = await this.departmentRepository.findOne({
      where: { id: depId },
    });
    return { department };
  }

  static async fetchById(depId) {
    const department = await Department.findByPk(depId);
    if (!department) {
      throw new NotFoundException('Invalid departmentId');
    }
    return department;
  }
}
