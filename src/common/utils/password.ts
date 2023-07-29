import * as bcryptjs from 'bcryptjs'

export const hashPassword = (password:string)=>
{
    return bcryptjs.hash(password,12)
}

export const comparePassword = (password:string,hashPassword:string)=>
{
    return bcryptjs.compare(password,hashPassword)
}