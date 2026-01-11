import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
  @ApiProperty({ example: "user@example.com", description: "Email" })
  @IsEmail({}, { message: "Invalid email" })
  @IsNotEmpty({ message: "Email is required" })
  readonly email: string;

  @ApiProperty({ example: "password123", description: "Password" })
  @IsNotEmpty({ message: "Password is required" })
  @IsString()
  readonly password: string;
}
