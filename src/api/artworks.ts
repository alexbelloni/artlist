const BASE_URL = "https://api.artic.edu/api/v1";

export const fetchArtworks = async (page: number) => {
  const response = await fetch(`${BASE_URL}/artworks?page=${page}&limit=12`);
  const data = await response.json();
  return data;
};

export const fetchArtworkDetails = async (id: number) => {
  const response = await fetch(`${BASE_URL}/artworks/${id}`);
  const data = await response.json();
  return data;
};
