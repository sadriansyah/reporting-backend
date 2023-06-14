import { Injectable, UnauthorizedException} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt} from 'passport-jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { UsersService} from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService){
    super({
      jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration :true,
      secretOrKey : process.env.SECRET_KEY
    })
  }

  async validate(payload : any){
    const user = await this.usersService.findUserById(payload.user_id);
    if(!user){
      throw new UnauthorizedException(`User is not found`);
    }

    return {user,user_id:payload.user_id};

  }


}
