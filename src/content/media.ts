import logoAsset from "@/assets/EA-Legacy-logo.png.asset.json";

export const brandMedia = {
  logo: logoAsset.url,
} as const;

export const mediaCrops = {
  heroVideo: {
    mobile: "50% center",
    desktop: "center center",
  },
  pathway: {
    mobile: "58% center",
    desktop: "center center",
  },
  organizationFilm: {
    mobile: "50% center",
    desktop: "center center",
  },
} as const;