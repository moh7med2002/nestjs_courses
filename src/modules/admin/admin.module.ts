import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
import repositories from 'src/common/constants/repositories';

@Module({
  controllers: [AdminController],
  providers: [
    {
      provide:repositories.adminRepo,
      useValue:Admin
    },
    AdminService,
  ],
})
export class AdminModule {}
