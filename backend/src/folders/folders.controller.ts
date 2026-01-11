import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Query,
  UseGuards,
  Request,
  Param,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from "@nestjs/swagger";
import { FoldersService } from "./folders.service";
import { CreateFolderDto } from "./dto/create-folder.dto";
import { EditFolderDto } from "./dto/edit-folder.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("Folders")
@Controller("/api/folders")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FoldersController {
  constructor(private foldersService: FoldersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new folder" })
  async createFolder(@Body() dto: CreateFolderDto, @Request() req: any) {
    const folder = await this.foldersService.createFolder(dto, req.user.id);
    return folder;
  }

  @Get()
  @ApiOperation({ summary: "Get folders" })
  @ApiQuery({
    name: "parentId",
    required: false,
    description: "Parent folder ID (null for root)",
  })
  async getFolders(
    @Query("parentId") parentId: string | null,
    @Request() req: any
  ) {
    const folders = await this.foldersService.getFolders(
      parentId === "null" || parentId === null || parentId === undefined
        ? null
        : parentId,
      req.user.id
    );
    return folders;
  }

  @Get(":id")
  @ApiOperation({ summary: "Get folder by ID with ancestors" })
  async getFolderById(@Param("id") id: string, @Request() req: any) {
    return this.foldersService.getFolderById(id, req.user.id);
  }
  @Put(":id")
  @ApiOperation({ summary: "Edit a folder" })
  async editFolder(
    @Param("id") id: string,
    @Request() req: any,
    @Body() dto: EditFolderDto
  ) {
    const folder = await this.foldersService.editFolder(
      id,
      req.user.id,
      dto.name,
      dto.parentId ?? null
    );
    if (!folder) {
      throw new NotFoundException("Folder not found");
    }
    return folder;
  }

  @Delete(":id")
  async deleteFolder(@Param("id") id: string, @Request() req: any) {
    return this.foldersService.deleteFolder(id, req.user.id);
  }

  @Post(":id/clone")
  @ApiOperation({ summary: "Clone a folder with all contents" })
  async cloneFolder(@Param("id") id: string, @Request() req: any) {
    return this.foldersService.cloneFolder(id, req.user.id);
  }
}
