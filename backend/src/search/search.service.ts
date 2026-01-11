import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { Folder } from "src/folders/folder.model";
import { File } from "src/files/file.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Folder) private folderRepo: typeof Folder,
    @InjectModel(File) private fileRepo: typeof File
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

  async search(query: string, userId: string) {
    if (!query || query.length < 2) {
      return { folders: [], files: [] };
    }

    const folders = await this.folderRepo.findAll({
      where: {
        userId,
        name: { [Op.iLike]: `%${query}%` },
      },
      limit: 10,
    });

    const files = await this.fileRepo.findAll({
      where: {
        userId,
        name: { [Op.iLike]: `%${query}%` },
      },
      limit: 10,
    });

    return {
      folders,
      files: files.map((file) => this.addUrl(file)),
    };
  }
}
