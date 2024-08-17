import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {fetchArtworks} from './api/locations/brooklyn/artworks';

test('renders learn react link', async () => {
  // render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();

  const d1 = Date.now();
  const c = await fetchArtworks(1,12);
  const d2 = Date.now();
  console.log(d1, d2, c.length);

});


