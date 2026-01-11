import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/users.model";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { LoginUserDto } from "src/users/dto/login-user.dto";
import { UsersService } from "src/users/users.service";
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}
  async login(userDto: LoginUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password
    );
    if (!passwordEquals) {
      throw new HttpException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        "Email has already exist",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPw = await bcrypt.hash(userDto.password, 12);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPw,
    });
    return this.generateToken(user);
  }
  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, name: user.name };

    return {
      token: this.jwtService.sign(payload),
      name: user.name,
    };
  }
}
