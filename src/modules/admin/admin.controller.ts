import { Controller,Post,Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminPost } from './dto';

@Controller('admin')
export class AdminController {
    constructor(private adminService:AdminService){}

    @Post('register')
    createAdmin(@Body() dto:AdminPost)
    {        
        return this.adminService.createAdmin(dto)
    }

    @Post('login')
    loginAdmin(@Body() dto:AdminPost)
    {
        return this.adminService.loginAdmin(dto)
    }
}
