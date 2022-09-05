import { Body, Controller, Get, Post,  } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { Authdto } from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService) {}

    @Post('signup')
    signup(@Body() dto:Authdto) {
        return this.authService.signup(dto)
     }

    @Post('signin')
    signin() {
        return this.authService.signin()
    }
}