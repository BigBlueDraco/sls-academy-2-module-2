import linkService from "../services/link.service";

class LinkController {
  async create(req: any, res: any) {
    try {
      const { longUrl } = req.body;
      const resalt = await linkService.create(longUrl);
      res.json(resalt);
    } catch (e) {
      console.log(e);
      res.status(500).json(`${e}`);
    }
  }
  async getOne(req: any, res: any) {
    try {
      const { shortUrl } = req.params;
      const resalt = await linkService.findOne(shortUrl);
      res.redirect(resalt?.longUrl);
    } catch (e) {
      console.log(e);
      res.status(500).json(`${e}`);
    }
  }
}
export default new LinkController();
