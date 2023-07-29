import { IsNotEmpty,MaxLength,MinLength } from "class-validator";

export class AdminPost {
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    @MaxLength(12)
    @MinLength(4)
    password:string
}