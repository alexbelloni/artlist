# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# ArtworkList App Documentation

## ArtworkList Component

### Description
The `ArtworkList` component displays a paginated list of artworks. Users can filter artworks by title or category, and navigate between pages.

### Features
- **Fetch Artworks:** Retrieves artworks from an API, supports pagination, and displays up to 10 pages.
- **Filter Artworks:** Allows filtering by title and category.
- **Pagination:** Displays up to 10 page links and handles page changes.

### Dependencies
- `fetchArtworks` (API function to get artworks)
- `getImageUrl` (Utility function to generate image URLs)
- `Header` (Header component)
- `Footer` (Footer component)
- `Loading` (Loading spinner component)

### Props
None

### State
- `artworks`: List of all artworks.
- `filteredArtworks`: List of artworks filtered by title and category.
- `page`: Current page number.
- `totalPages`: Total number of pages.
- `loading`: Loading state.
- `filter`: Current filter text.
- `pageChanging`: Indicates if the page is changing.
- `categories`: List of unique categories.
- `selectedDropdownCategory`: Selected category from dropdown.

### Functions
- `fetchAllArtworks`: Fetches artworks, handles pagination, and sets state.
- `applyFilter`: Filters artworks based on title and selected category.
- `handlePageChange`: Changes the current page and updates URL.

### Rendered Output
- **Input**: Text input for filtering by title.
- **Select**: Dropdown for selecting a category.
- **Artwork Cards**: Displays artworks with title and category badges.
- **Pagination**: Page links for navigating between pages.

---

## ArtworkDetail Component

### Description
The `ArtworkDetail` component shows details for a single artwork, including an image, artist information, and a comment form.

### Features
- **Fetch Artwork Details:** Retrieves details for a specific artwork from an API.
- **Comment Form:** Allows users to leave a comment with validation for email, name, and text.

### Dependencies
- `fetchArtworkDetails` (API function to get artwork details)
- `getImageUrl` (Utility function to generate image URLs)
- `Header` (Header component)
- `Footer` (Footer component)
- `Loading` (Loading spinner component)

### Props
None

### State
- `artwork`: Details of the selected artwork.
- `form`: Data for the comment form (email, name, text).
- `errors`: Validation errors for the form.

### Functions
- `getArtwork`: Fetches details of the artwork based on the ID from URL parameters.
- `handleChange`: Updates form data on input change.
- `validateForm`: Validates the form fields and returns if valid.
- `handleSubmit`: Handles form submission, logs form data if valid.

### Rendered Output
- **Artwork Details**: Image, title, artist, date, reference number, dimensions, and category badges.
- **Comment Form**: Fields for email, name, and comment with validation errors.

---

Feel free to expand or adjust based on your needs!
