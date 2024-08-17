import { fetchArtworks as brooklyn } from './locations/brooklyn/artworks'
import { fetchArtworks as chicago } from './locations/chicago/artworks'

export const getNextPage = async (currentPage: number) => {
    const PER_PAGE_LIMIT = 6;

    const storedData = localStorage.getItem(currentPage.toString());
    if (storedData) return JSON.parse(storedData);

    const data1 = await brooklyn(currentPage, PER_PAGE_LIMIT);
    const data2 = await chicago(currentPage, PER_PAGE_LIMIT);

    const data = data1.concat(data2).sort((a, b) => a.date_display < b.date_display ? -1 : 1);

    const items = { page: currentPage, created: Date.now().toString(), data }
    localStorage.setItem('1', JSON.stringify(items));
    return items;
}
