import { Injectable,Inject,ForbiddenException,NotFoundException} from '@nestjs/common';
import { AdminPost } from './dto';
import repositories from 'src/common/constants/repositories';
import { Admin } from './admin.entity';
import { createToken } from 'src/common/utils/createToken';
import { comparePassword, hashPassword } from 'src/common/utils/password';

@Injectable()
export class AdminService {
    constructor(
        @Inject(repositories.adminRepo)
        private adminRepository : typeof Admin,
    ){}
    async createAdmin(dto:AdminPost)
    {
        const existAdmin = await this.adminRepository.findOne()
        if(existAdmin)
        {
            throw new ForbiddenException("there is a admin in system")
        }
        const passowrd = await hashPassword(dto.password)
        const admin = await this.adminRepository.create({email:dto.email,password:passowrd})
        return {message:"admin account has created",admin}
    }

    async loginAdmin(dto:AdminPost)
    {
        const {email} = dto
        const foundAdmin = await this.adminRepository.findOne({where:{email:email}})
        if(!foundAdmin)
        {
            throw new NotFoundException("email is wrong")
        }
        const isMatch = await comparePassword(dto.password,foundAdmin.password)
        if(!isMatch)
        {
            throw new NotFoundException("password is wrong")
        }
        const token = createToken(foundAdmin.id,"admin")
        const {password , ...others} = foundAdmin.toJSON()  
        return {admin:others,token}
    }
}
