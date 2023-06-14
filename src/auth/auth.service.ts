import { Injectable, UnauthorizedException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from '../schemas/auth.schema';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { refreshTokenConfig } from 'src/config/jwt.config';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel:Model<AuthDocument>,
    private usersService:UsersService,
    private jwtService:JwtService
  ){}


  async login(loginDto :LoginDto){
    const {email, password} = loginDto;
    const user = await this.usersService.validateUser(email, password);
    if(!user){
      throw new UnauthorizedException("Email or Password Wrong") 
    }
    const access_token = await this.createAccessToken(user._id, user.email,user.level);
    const refresh_token = await this.createRefreshToken(user._id);
    return {access_token,refresh_token};
  }

  async createAccessToken(id, email, level){
      const payload = {
        user_id:id,
        email:email,
        level:level
      };
      const access_token = await this.jwtService.signAsync(payload);
      return access_token;
  }

  async createRefreshToken(id):Promise<string> {
    const refreshToken = await this.configRefreshToken(id,+refreshTokenConfig.expiresIn);
    const payload = {
      jid:refreshToken._id
    };
    const refresh_token = await this.jwtService.signAsync(payload, refreshTokenConfig);
    return refresh_token;
  }


  async configRefreshToken(user_id:string, ttl:number){
    const expiredAt = new Date();
    expiredAt.setTime(expiredAt.getTime() + ttl);

    const authSave = {
      user_id:user_id,
      isRevoked:false,
      expiredAt:expiredAt
    };
    const create = new this.authModel(authSave);
    return await create.save();
  }

  async decodeToken(token:string):Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      if(error instanceof TokenExpiredError){
        throw new UnauthorizedException ('Refresh Token is expired');
      }else{
        throw new InternalServerErrorException('Failed to decode token');
      }
    }
  }

  async refreshAccessToken(refresh_token:string){
    const payload = await this.decodeToken(refresh_token);
    const refreshToken = await this.authModel.findOne({_id:payload.jid});
    if(!refreshToken){
      throw new UnauthorizedException('Refresh token is not found');
    }

    if(refreshToken.isRevoked){
      throw new UnauthorizedException('Refresh token has been revoked');
    }
    const user = await this.usersService.findUserById(refreshToken.user_id);

    const access_token = await this.createAccessToken(refreshToken.user_id, user.email, user.level);
    return {access_token};
  }

  async revokeRefreshToken(id:string){
    const refreshToken = await this.authModel.findById({_id:id});
    if(!refreshToken){
      throw new NotFoundException(`Refresh token is not found`);
    }

    const payload = {
      user_id:refreshToken.user_id,
      isRevoked:true,
      expiredAt:refreshToken.expiredAt
    }
    await this.authModel.findOneAndReplace({_id:id}, payload,{new:true});


  }



}
