import { Links, PrismaClient } from "@prisma/client";
import randomstring from "randomstring";

class LinkService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async create(longUrl: string) {
    try {
      const shortUrl = randomstring.generate({ length: 6 });
      return await this.prisma.links.create({
        data: { shortUrl, longUrl },
      });
    } catch (e) {
      console.log(e);
    }
  }
  async findOne(shortUrl: string) {
    try {
      return await this.prisma.links.findUnique({ where: { shortUrl } });
    } catch (e) {
      console.log(e);
    }
  }
}

export default new LinkService();
