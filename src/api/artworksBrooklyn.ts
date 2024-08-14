import fakeDataResponse from "./fakeDataResponse.json"
//import { ArtObject } from './ArtObject'

export const fetchArtworks = async (page: number, per_page: number) => {
  const brooklynObjects = {
    "pagination": {
      "total_pages": 1
    },
    "data": fakeDataResponse.map((obj) => {
      const { id, title, collections, artists, object_date, accession_number, dimensions } = obj;
      const x = {
        id: id * -1, image_id: "", title, category_titles: collections, artist_display: artists.join(', '),
        date_display: object_date,
        main_reference_number: accession_number,
        dimensions,
        location_name: "Brooklyn Museum",
        image_url: ""
      }
      return x
    })
  }

  return {
    "pagination": {
      "total_pages": brooklynObjects.pagination.total_pages
    },
    "data": brooklynObjects.data
  };
}

export const fetchArtworkDetails = async (id: number) => {
  return null
};
