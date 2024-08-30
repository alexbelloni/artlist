import { ArtObject } from "../../ArtObject";
import fakeDataResponse from "./fakeDataResponse.json"

export type MyAPIArtObject = { 
  id: number; 
  title: string; 
  collections: string[]; 
  artists: string[]; 
  object_date: string; 
  accession_number: string; 
  dimensions: string; 
  images: string[]; 
}

const brooklynObjectToArtObject = (brooklynObject: MyAPIArtObject) => {
  const { id, title, collections, artists, object_date, accession_number, dimensions, images } = brooklynObject;
  return {
    id: id, 
    image_id: id.toString(), 
    title, category_titles: collections, 
    artist_display: artists.join(', '),
    date_display: object_date,
    main_reference_number: accession_number,
    dimensions,
    location_name: "Brooklyn Museum",
    image_url: images[0]
  }
}

export const fetchArtworks = async (page: number, per_page: number) => {
  return new Promise<ArtObject[]>((resolve) => {
    if (page > 1) resolve([])

    const response: ArtObject[] = fakeDataResponse.map((obj) => {
      return brooklynObjectToArtObject(obj);
    })
    setTimeout(() => {
      resolve(response);
    }, 2000)
  })
}

export const fetchArtworkDetails = async (nid: number) => {
  const obj = brooklynObjectToArtObject(fakeDataResponse.filter(o => o.id === nid)[0]);
  return { ...obj, image_url: `.${obj.image_url}` }
};
