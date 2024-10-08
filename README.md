
# ArtListingApp Documentation
	
  ![app screenshot](./public/artlistingapp.jpg)

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Components

The `ArtworkList` component displays a paginated list of artworks. Users can filter artworks by title or category, and navigate between pages.

The `ArtworkDetail` component displays details of an artwork. 

### Features
- **Fetch Artworks:** Retrieves artworks from museums APIs, supports pagination, and displays 5 pages of artworks.
- **Filter Artworks:** Allows filtering by title and category.
- **Pagination:** Displays 5 page links and handles page changes.

### Dependencies
- `GetPage` (Hub of API unctions from each museum to get an array of ArtObject objects)
- `fetchArtworks` (API function of each museum to get artworks as a JSON object)
- `fetchArtworkDetails` (API function of each museum to get artwork details as a JSON object)

### ArtObject JSON Object

```
{
    id: number,
    image_id: string,
    title: string,
    category_titles: string[],
    artist_display: string,
    date_display: string,
    main_reference_number: string,
    dimensions: string,
    location_name: string,
    image_url: string
  }
```
### ArtObject Detail JSON Object

```
{
  image_id: string,
  title: string,
  image_url: string,
  artist_display: string,
  main_reference_number: string,
  dimensions: string,
  category_titles: string[]
  }
```
### Adding new Museum

- In the ./api/locations, create a new museum folder.
- In the artworks.ts, create two functions fetchArtworks and fetchArtworkDetails, which return ArtObject[] and ArtObjectDetail, respectively
- Add these functions to getPage function, in the getPage.tsx file, and in the ArtworkDetail component. 

### Environment Variables (.env)

REACT_APP_PER_PAGE_LIMIT=12  
REACT_APP_CACHE_TIMEOUT=180000  
REACT_APP_QUANTITY=5  
REACT_APP_USE_CACHE=1  


