import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";
import { Get, Query, Request } from "@nestjs/common";
import { SearchService } from "./search.service";

@ApiTags("Search")
@Controller("/api/search")
@UseGuards(JwtAuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(@Query("q") query: string, @Request() req: any) {
    return this.searchService.search(query, req.user.id);
  }
}
