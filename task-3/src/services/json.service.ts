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
    try {
      return await prisma.jsonData.create({
        data: {
          name: jsonInput.name,
          data: JSON.stringify(jsonInput.data),
          bucketName,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
  async create(bucketName: string, jsonInput: any) {
    try {
      let bucket = await prisma.bucket.findUnique({
        where: { name: bucketName },
      });
      if (!bucket) {
        bucket = await this.createBucket(bucketName);
      }
      const existingJson = await this.findOne(bucket.name, jsonInput.name);
      if (existingJson) {
        console.log(existingJson);
        throw new Error(
          `Json with name: ${jsonInput.name} in ${bucket.name} alredy exist`
        );
      }
      const res = await this.createJson(bucket.name, jsonInput);
      return res;
    } catch {}
  }

  async findOne(bucketName: string, name: string) {
    return await prisma.jsonData.findFirst({
      where: { name, bucketName },
    });
  }
}

export default new JsonService();
