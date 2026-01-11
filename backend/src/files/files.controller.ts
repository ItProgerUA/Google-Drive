import {
  Controller,
  Post,
  Get,
  Put,
  Param,
  Query,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Res,
  NotFoundException,
  Delete,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { v4 as uuidv4 } from "uuid";

import type { Response } from "express";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiQuery,
} from "@nestjs/swagger";
import { FilesService } from "./files.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { EditFileDto } from "./dto/edit-file.dto";
const storage = diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/") ||
    file.mimetype.startsWith("application/pdf")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images, videos and PDFs are allowed"), false);
  }
};

@ApiTags("Files")
@Controller("/api/files")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post("upload")
  @ApiOperation({ summary: "Upload a file" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" },
        folderId: { type: "string", nullable: true },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor("file", {
      storage,
      fileFilter,
      limits: { fileSize: 50 * 1024 * 1024 },
    })
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query("folderId") folderId: string | null,
    @Request() req: any
  ) {
    const parsedFolderId =
      folderId === "null" || folderId === undefined ? null : folderId;
    return this.filesService.uploadFile(file, parsedFolderId, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: "Get files in folder" })
  @ApiQuery({
    name: "folderId",
    required: false,
    description: "Folder ID (null for root)",
  })
  async getFiles(
    @Query("folderId") folderId: string | null,
    @Request() req: any
  ) {
    const parsedFolderId =
      folderId === "null" || folderId === null || folderId === undefined
        ? null
        : folderId;
    return this.filesService.getFiles(parsedFolderId, req.user.id);
  }

  @Get(":id/download")
  @ApiOperation({ summary: "Download a file" })
  async downloadFile(
    @Param("id") id: string,
    @Request() req: any,
    @Res() res: Response
  ) {
    const file = await this.filesService.getFileById(id, req.user.id);

    if (!file) {
      throw new NotFoundException("File not found");
    }

    const filePath = join(process.cwd(), "uploads", file.filename);
    res.sendFile(filePath);
  }
  @Delete(":id")
  @ApiOperation({ summary: "Delete a file" })
  async deleteFile(@Param("id") id: string, @Request() req: any) {
    return this.filesService.deleteFile(id, req.user.id);
  }
  @Put(":id")
  @ApiOperation({ summary: "Edit a file" })
  async editFile(
    @Param("id") id: string,
    @Request() req: any,
    @Body() dto: EditFileDto
  ) {
    const file = await this.filesService.editFile(
      id,
      req.user.id,
      dto.name,
      dto.folderId ?? null
    );
    if (!file) {
      throw new NotFoundException("File not found");
    }
    return file;
  }
  @Post(":id/clone")
  @ApiOperation({ summary: "Clone a file" })
  async cloneFile(@Param("id") id: string, @Request() req: any) {
    return this.filesService.cloneFile(id, req.user.id);
  }
}
