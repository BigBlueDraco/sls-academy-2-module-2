class IpAddres {
  toInt(ip) {
    const parts = ip.split(".");
    return (
      (parseInt(parts[0]) << 24) +
      (parseInt(parts[1]) << 16) +
      (parseInt(parts[2]) << 8) +
      parseInt(parts[3])
    );
  }
  toIp(int) {
    const part1 = int & 255;
    const part2 = (int >> 8) & 255;
    const part3 = (int >> 16) & 255;
    const part4 = (int >> 24) & 255;
    return part4 + "." + part3 + "." + part2 + "." + part1;
  }
}
export default new IpAddres();
