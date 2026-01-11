import { Controller, Post, Body, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
@ApiTags("Users")
@Controller("/api/users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 200, type: User })
  @Post("/create")
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({ status: 200, type: [User] })
  @Get("/get-all")
  getAll() {
    return this.usersService.getAllUser();
  }
}
