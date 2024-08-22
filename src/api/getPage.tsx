import { fetchArtworks as brooklyn } from './locations/brooklyn/artworks'
import { fetchArtworks as chicago } from './locations/chicago/artworks'
import { GetDisplayableDate, GetSecondsApart } from './utils';

const PER_PAGE_LIMIT = parseInt(process.env.REACT_APP_PER_PAGE_LIMIT || "0");
const CACHE_TIMEOUT = parseInt(process.env.REACT_APP_CACHE_TIMEOUT || "0");

export const getPage = async (currentPage: number) => {
    const cachedItem = localStorage.getItem(currentPage.toString());
    if (cachedItem) {
        const item = JSON.parse(cachedItem);
        if (item) {
            const secs = GetSecondsApart(item.date, Date.now())
            if (secs < CACHE_TIMEOUT) {
                return item;
            }
        }
    }

    const museums = 2;
    const data1 = await brooklyn(currentPage, PER_PAGE_LIMIT / museums);
    const data2 = await chicago(currentPage, PER_PAGE_LIMIT - data1.length);

    const data = data1.concat(data2).sort((a, b) => a.date_display < b.date_display ? -1 : 1);

    const item = { page: currentPage, cached: GetDisplayableDate(Date.now()), date: Date.now(), data }
    localStorage.setItem(currentPage.toString(), JSON.stringify(item));
    return item;
}
