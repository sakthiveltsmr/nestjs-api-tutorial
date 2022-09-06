import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Authdto } from "./dto";
import * as argon from "argon2"
import { Prisma } from "@prisma/client";
@Injectable({})
export class AuthService {
  constructor(private prisma:PrismaService){}
    async signup(dto:Authdto) {

        //generate the has the password

        const hash=await argon.hash(dto.password);

        //store the user details from database
        const result=await this.prisma.user.findUnique({where:{email:dto.email}})
        if(result){
         throw console.error("user already exists");
         
        }
        const user=await this.prisma.user.create({
            data:{ 
        
              email: dto.email,
              hash,
            },
            select:{
                id:true,
                firstName:true,
                lastName:true,
                email:true
            }
        });


        //given to response in saved data 
        return user
    }

    signin(){
        return {msg:'I have signed in'}
    }
}