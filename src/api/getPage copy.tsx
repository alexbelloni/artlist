import { fetchArtworks as brooklyn } from './locations/brooklyn/artworks'
import { fetchArtworks as chicago } from './locations/chicago/artworks'
import { GetDisplayableDate, GetSecondsApart } from './utils';

export const getPage = async (currentPage: number) => {
    const PER_PAGE_LIMIT = 6;
    const CACHE_TIMEOUT = 180000; //3 MINUTES

    let items = []
    const cachedItems = localStorage.getItem("1");
    if (cachedItems) {
        items = JSON.parse(cachedItems);
        const item = items[currentPage]
        if(item){
            const secs = GetSecondsApart(item.date, Date.now())
            if (secs < CACHE_TIMEOUT)
                return item;
        }
    }

    const data1 = await brooklyn(currentPage, PER_PAGE_LIMIT);
    const data2 = await chicago(currentPage, PER_PAGE_LIMIT);

    const data = data1.concat(data2).sort((a, b) => a.date_display < b.date_display ? -1 : 1);

    const item = { page: currentPage, cached: GetDisplayableDate(Date.now()), date: Date.now(), data }
    items.push(item)
    localStorage.setItem("1", JSON.stringify(items));
    return item;
}
