import LocationServices from "../services/Location.services.js";

class Location {
  async findCountry(req, res) {
    try {
      const { ip } = req.body;
      const country = await LocationServices.findCountryByIp(ip);
      return res.json(country || "Not found");
    } catch (e) {
      console.log(e.message);
    }
  }
}

export default new Location();
