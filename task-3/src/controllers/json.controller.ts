import jsonService from "../services/json.service";

class JsonController {
  async create(req: any, res: any) {
    try {
      const { bucketName, name } = req.params;
      const data = req.body;
      const jsonInput = { name: name, data };
      const result = await jsonService.create(bucketName, jsonInput);
      res.json(result?.data);
    } catch (e) {
      res.status(500).json(`${e}`);
    }
  }
  async getOne(req: any, res: any) {
    try {
      const { bucketName, name } = req.params;
      const result = await jsonService.findOne(bucketName, name);
      res.json(JSON.parse(`${result?.data}`));
    } catch (e) {
      res.status(500).json(`${e}`);
    }
  }
}

export default new JsonController();
