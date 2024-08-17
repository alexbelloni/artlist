import { ArtObject } from '../../ArtObject'

const BASE_URL = "https://api.artic.edu/api/v1";

const getImageUrl = (imageId: string) => {
  return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
};

export const fetchArtworks = async (page: number, per_page: number) => {
  const response = await fetch(`${BASE_URL}/artworks?page=${page}&limit=${per_page}`);
  const chicagoObjects = await response.json();

  return chicagoObjects.data.map((d: ArtObject) => {
    return { ...d, location_name: "Chicago Museum", image_url: d.image_id ? getImageUrl(d.image_id)
      : "default_image.png" }
  })
}

export const fetchArtworkDetails = async (id: number) => {
  const response = await fetch(`${BASE_URL}/artworks/${id}`);
  const data = await response.json();
  return data;
};
