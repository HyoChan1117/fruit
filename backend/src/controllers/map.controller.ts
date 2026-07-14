import { Request, Response } from "express";

const NCP_STATIC_MAP_URL = "https://maps.apigw.ntruss.com/map-static/v2/raster";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const cache = new Map<string, { buffer: Buffer; contentType: string; expiresAt: number }>();

export async function getStaticMap(req: Request, res: Response) {
  const { lat, lng, w = "800", h = "400", level = "16" } = req.query;

  if (!lat || !lng) {
    res.status(400).json({ message: "lat, lng는 필수입니다." });
    return;
  }

  const cacheKey = `${lat},${lng},${w},${h},${level}`;
  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    res.setHeader("Content-Type", cached.contentType);
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(cached.buffer);
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

  const contentType = response.headers.get("content-type") ?? "image/png";
  const buffer = Buffer.from(await response.arrayBuffer());
  cache.set(cacheKey, { buffer, contentType, expiresAt: Date.now() + CACHE_TTL_MS });

  res.setHeader("Content-Type", contentType);
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.send(buffer);
}
