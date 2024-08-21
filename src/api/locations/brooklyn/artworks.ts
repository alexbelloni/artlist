import { ArtObject } from "../../ArtObject";
import fakeDataResponse from "./fakeDataResponse.json"
//import { ArtObject } from './ArtObject'

export const fetchArtworks = async (page: number, per_page: number) => {
  return new Promise<ArtObject[]>((resolve) => {
    if(page > 1) resolve([])
      
    const response: ArtObject[] = fakeDataResponse.map((obj) => {
      const { id, title, collections, artists, object_date, accession_number, dimensions, images } = obj;
      const x = {
        id: id * -1, image_id: "", title, category_titles: collections, artist_display: artists.join(', '),
        date_display: object_date,
        main_reference_number: accession_number,
        dimensions,
        location_name: "Brooklyn Museum",
        image_url: images[0]
      }
      return x;
    })
    setTimeout(() => {
      resolve(response);
    }, 4000)//Math.floor(Math.random() * max);
  })
}

export const fetchArtworkDetails = async (id: number) => {
  return null
};
