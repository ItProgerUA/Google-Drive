import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
export class CreateUserDto {
  @ApiProperty({ example: "user@example.com", description: "Email" })
  @IsEmail({}, { message: "Invalid email" })
  @IsNotEmpty({ message: "Email is required" })
  @IsString({ message: "Email must be a string" })
  readonly email: string;

  @ApiProperty({ example: "password123", description: "Password" })
  @IsNotEmpty({ message: "Password is required" })
  @Length(6, 12, { message: "Password must be between 6 and 12 characters" })
  readonly password: string;

  @ApiProperty({ example: "User", description: "Name" })
  @IsNotEmpty({ message: "Name is required" })
  @IsString({ message: "Name must be a string" })
  @Length(2, 30, { message: "Name must be between 2 and 30 characters" })
  readonly name: string;
}
