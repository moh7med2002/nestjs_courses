import { IsNotEmpty } from "class-validator";

export class DepartmentInfo {
    @IsNotEmpty()
    title:string
}