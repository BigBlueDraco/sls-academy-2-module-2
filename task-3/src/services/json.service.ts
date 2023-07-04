import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
class JsonService {
  async createBucket(bucketName: string) {
    return await prisma.bucket.create({ data: { name: bucketName } });
  }
  async createJson(
    bucketName: string,
    jsonInput: { name: string; data: string }
  ) {
    return await prisma.jsonData.create({
      data: { name: jsonInput.name, data: jsonInput.data, bucketName },
    });
  }
  async create(bucketName: string, jsonInput: any) {
    try {
      let bucket = await prisma.bucket.findUnique({
        where: { name: bucketName },
      });
      if (!bucket) {
        bucket = await this.createBucket(bucketName);
      }
      const existingJson = await prisma.jsonData.findFirst({
        where: { name: jsonInput.name, bucketName: bucket.name },
      });

      if (existingJson) {
        throw new Error(
          `Json with name: ${jsonInput.name} in ${bucket.name} alredy exist`
        );
      }

      return await this.createJson(bucket.name, jsonInput);
    } catch {
      return;
    }
  }
}

export default new JsonService();
