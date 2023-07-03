import IpAddres from "./IpAddres.js";
import fs from "fs";
import csv from "csv-parser";
import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 60 });

class Location {
  async findCountryByIp(ip) {
    try {
      console.time(`${ip}`);

      const ipInt = IpAddres.toInt(ip);
      let ipToLocation = cache.get("IP2LOCATION");
      if (!ipToLocation) {
        ipToLocation = [];
        await new Promise((resolve, reject) => {
          fs.createReadStream("IP2LOCATION-LITE-DB1.CSV")
            .pipe(csv(["start", "end", "short", "country"]))
            .on("data", (data) => ipToLocation.push(data))
            .on("end", resolve)
            .on("error", reject);
        });

        cache.set("IP2LOCATION", ipToLocation);
      }

      const res = ipToLocation.filter(
        (elem) => ipInt >= +elem.start && ipInt <= +elem.end
      );
      console.log(res);
      console.timeLog(`${ip}`);
      return res;
    } catch (e) {}
  }
}

export default new Location();
