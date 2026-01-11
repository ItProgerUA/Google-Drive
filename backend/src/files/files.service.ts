import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { File } from "./file.model";
import { EventsGateway } from "src/events/events.gateway";
import { copyFile, unlink } from "fs/promises";
import { extname, join } from "path";
import { v4 as uuidv4 } from "uuid";
@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File) private fileRepository: typeof File,
    private eventsGateway: EventsGateway
  ) {}

  private getFileUrl(filename: string): string {
    const baseUrl = process.env.BASE_URL || "http://localhost:5001";
    return `${baseUrl}/uploads/${filename}`;
  }

  private addUrl(file: File) {
    return {
      ...file.toJSON(),
      url: this.getFileUrl(file.filename),
    };
  }

  async uploadFile(
    file: Express.Multer.File,
    folderId: string | null,
    userId: string
  ) {
    const newFile = await this.fileRepository.create({
      name: file.originalname,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      folderId: folderId || null,
      userId,
    });
    this.eventsGateway.emitUpdate("files:update");
    return this.addUrl(newFile);
  }

  async getFiles(folderId: string | null, userId: string) {
    const whereClause: any = { userId };

    if (folderId === null || folderId === undefined) {
      whereClause.folderId = null;
    } else {
      whereClause.folderId = folderId;
    }

    const files = await this.fileRepository.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    return files.map((file) => this.addUrl(file));
  }

  async getFilesInFolder(folderId: string, userId: string) {
    const files = await this.fileRepository.findAll({
      where: { folderId, userId },
    });
    return files;
  }

  async getFileById(id: string, userId: string) {
    const file = await this.fileRepository.findOne({
      where: { id, userId },
    });

    if (!file) return null;

    return this.addUrl(file);
  }
  async deleteFile(id: string, userId: string) {
    const file = await this.fileRepository.findOne({
      where: { id, userId },
    });
    if (!file) return null;
    const filePath = join(process.cwd(), "uploads", file.filename);
    await unlink(filePath);
    await file.destroy();
    this.eventsGateway.emitUpdate("files:update");
    return { message: "File deleted successfully" };
  }
  async editFile(
    id: string,
    userId: string,
    name: string,
    folderId: string | null
  ) {
    const file = await this.fileRepository.findOne({
      where: { id, userId },
    });
    if (!file) return null;

    file.name = name;
    file.folderId = folderId;
    await file.save();

    this.eventsGateway.emitUpdate("files:update");
    return this.addUrl(file);
  }
  async cloneFile(id: string, userId: string, newFolderId?: string) {
    const file = await this.fileRepository.findOne({
      where: { id, userId },
    });
    if (!file) return null;

    const ext = extname(file.filename);
    const newFilename = `${uuidv4()}${ext}`;

    const srcPath = join(process.cwd(), "uploads", file.filename);
    const destPath = join(process.cwd(), "uploads", newFilename);
    await copyFile(srcPath, destPath);

    const newFile = await this.fileRepository.create({
      name: `${file.name} (copy)`,
      filename: newFilename,
      mimetype: file.mimetype,
      size: file.size,
      folderId: newFolderId ?? file.folderId,
      userId,
    });

    this.eventsGateway.emitUpdate("files:update");
    return this.addUrl(newFile);
  }
}
