import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Folder } from "./folder.model";
import { CreateFolderDto } from "./dto/create-folder.dto";
import { EventsGateway } from "src/events/events.gateway";
import { FilesService } from "src/files/files.service";

@Injectable()
export class FoldersService {
  constructor(
    @InjectModel(Folder) private folderRepository: typeof Folder,
    private eventsGateway: EventsGateway,
    @Inject(forwardRef(() => FilesService))
    private filesService: FilesService
  ) {}

  async createFolder(dto: CreateFolderDto, userId: string) {
    const folder = await this.folderRepository.create({
      ...dto,
      userId,
      parentId: dto.parentId || null,
    });
    this.eventsGateway.emitUpdate("folders:update");
    return folder;
  }

  async getFolders(parentId: string | null, userId: string) {
    const whereClause: any = {
      userId,
    };

    if (parentId === null || parentId === undefined) {
      whereClause.parentId = null;
    } else {
      whereClause.parentId = parentId;
    }

    const folders = await this.folderRepository.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    return folders;
  }

  async getFolderById(id: string, userId: string) {
    const folder = await this.folderRepository.findOne({
      where: { id, userId },
    });

    if (!folder) {
      return null;
    }

    const ancestors = await this.getAncestors(folder.parentId, userId);

    return {
      ...folder.toJSON(),
      ancestors,
    };
  }
  async editFolder(
    id: string,
    userId: string,
    name: string,
    parentId: string | null
  ) {
    const folder = await this.folderRepository.findOne({
      where: { id, userId },
    });
    if (!folder) return null;

    folder.name = name;
    folder.parentId = parentId;
    await folder.save();

    this.eventsGateway.emitUpdate("folders:update");
    return folder;
  }

  async deleteFolder(id: string, userId: string) {
    const folder = await this.folderRepository.findOne({
      where: { id, userId },
    });
    const isOwner = folder.userId === userId;
    if (!folder || !isOwner) {
      throw new NotFoundException("Folder not found");
    }
    const children = await this.folderRepository.findAll({
      where: { parentId: id },
    });
    if (children.length > 0) {
      throw new BadRequestException("Folder has children");
    }
    await folder.destroy();
    this.eventsGateway.emitUpdate("folders:update");
    return { message: "Folder deleted successfully" };
  }
  private async getAncestors(parentId: string | null, userId: string) {
    const ancestors: { id: string | null; name: string }[] = [
      { id: null, name: "My Drive" },
    ];

    let currentParentId = parentId;

    while (currentParentId) {
      const parent = await this.folderRepository.findOne({
        where: { id: currentParentId, userId },
      });

      if (!parent) break;

      ancestors.push({ id: parent.id, name: parent.name });
      currentParentId = parent.parentId;
    }

    return ancestors;
  }

  async cloneFolder(id: string, userId: string, newParentId?: string) {
    const original = await this.folderRepository.findOne({
      where: { id, userId },
    });
    if (!original) {
      throw new NotFoundException("Folder not found");
    }

    const clone = await this.folderRepository.create({
      name: `${original.name} (copy)`,
      parentId: newParentId ?? original.parentId,
      userId,
    });

    const files = await this.filesService.getFilesInFolder(id, userId);
    for (const file of files) {
      await this.filesService.cloneFile(file.id, userId, clone.id);
    }

    const subfolders = await this.folderRepository.findAll({
      where: { parentId: id, userId },
    });
    for (const subfolder of subfolders) {
      await this.cloneFolder(subfolder.id, userId, clone.id);
    }

    this.eventsGateway.emitUpdate("folders:update");
    return clone;
  }
}
