import { Request, Response } from "express";

const NCP_STATIC_MAP_URL = "https://maps.apigw.ntruss.com/map-static/v2/raster";

export async function getStaticMap(req: Request, res: Response) {
  const { lat, lng, w = "800", h = "400", level = "16" } = req.query;

  if (!lat || !lng) {
    res.status(400).json({ message: "lat, lng는 필수입니다." });
    return;
  }

  const params = new URLSearchParams({
    center: `${lng},${lat}`,
    level: String(level),
    w: String(w),
    h: String(h),
    scale: "2",
    format: "png",
    markers: `type:d|size:mid|pos:${lng} ${lat}`,
  });

  const response = await fetch(`${NCP_STATIC_MAP_URL}?${params.toString()}`, {
    headers: {
      "X-NCP-APIGW-API-KEY-ID": process.env.NCP_CLIENT_ID ?? "",
      "X-NCP-APIGW-API-KEY": process.env.NCP_CLIENT_SECRET ?? "",
    },
  });

  if (!response.ok) {
    res.status(response.status).send(await response.text());
    return;
  }

  res.setHeader("Content-Type", response.headers.get("content-type") ?? "image/png");
  res.send(Buffer.from(await response.arrayBuffer()));
}
