import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Loading from "./Loading";
import { ArtObject } from "../api/ArtObject";
import Badge from "./Badge";
import { getPage } from "../api/getPage";

const ArtworkList: React.FC = () => {
  const [artworks, setArtworks] = useState<ArtObject[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<ArtObject[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [pageChanging, setPageChanging] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedDropdownCategory, setSelectedDropdownCategory] =useState<string>("");
  const [pageCachedAt, setPageCachedAt] = useState('')
  const [renderArea, setRenderArea] = useState(<nav></nav>)

const QUANTITY = parseInt(process.env.REACT_APP_QUANTITY || "0");

  useEffect(() => {
    const fetchAllArtworks = async () => {
      setLoading(true);

      let pageQuantityWhenStarting: number = QUANTITY;
      while (pageQuantityWhenStarting) {
        await getPage(pageQuantityWhenStarting--)
      }

      const items = await getPage(page);
      const allArtworks: ArtObject[] = items.data;

      setPageCachedAt(items.cached)
      setArtworks(allArtworks);
      setFilteredArtworks(allArtworks);

      // Extract unique categories from the artworks
      // const uniqueCategories = Array.from(
      //   new Set(allArtworks.flatMap((artwork) => artwork.category_titles || []))
      // );

      // setCategories(uniqueCategories);
      //setTotalPages(Math.ceil(allArtworks.length / PER_PAGE_LIMIT));
      setPage(1)
      setLoading(false);
    };

    fetchAllArtworks();
  }, []);

  // useEffect(() => {
  //   // Parse page number from URL query parameters
  //   const queryParams = new URLSearchParams(location.search);
  //   const pageParam = parseInt(queryParams.get("page") || "1", 10);
  //   if (pageParam >= 1 && pageParam <= totalPages) {
  //     setPage(pageParam);
  //   }
  // }, [location.search, totalPages]);

  // useEffect(() => {
  //   // Apply filter when filter text changes, category changes, or artworks data changes
  //   const applyFilter = () => {
  //     const filtered = artworks.filter(
  //       (artwork) =>
  //         artwork.title.toLowerCase().includes(filter.toLowerCase()) &&
  //         (selectedDropdownCategory === "" ||
  //           artwork.category_titles.includes(selectedDropdownCategory))
  //     );
  //     setFilteredArtworks(filtered);
  //     setTotalPages(Math.ceil(filtered.length / PER_PAGE_LIMIT));
  //     setPage(1);
  //   };

  //   applyFilter();
  // }, [filter, selectedDropdownCategory, artworks]);

  const handlePageChange = async (newPage: number) => {
    window.scrollTo(0, 0);

    const item = await getPage(newPage);
    const allArtworks: ArtObject[] = item.data;

    setPageCachedAt(item.cached)
    setArtworks(allArtworks);
    setFilteredArtworks(allArtworks);

      setPage(newPage);

  };

  useEffect(() => {
    setRenderArea(<nav>
      <ul className="pagination justify-content-center my-4">
        {(new Array(QUANTITY)).fill('').map((q, p) => (
          <li key={p + 1}
            className={`page-item ${p + 1 === page ? "active" : ""}`}
            onClick={() => handlePageChange(p + 1)}
          >
            <span className="page-link">{p + 1}</span>
          </li>
        ))}
      </ul>
    </nav>);
  }, [page])

  return (
    <>
      <Header />
      <div className="container pt-4">
        {/* <div className="mb-4 mt-4">
          <div className="row">
            <div className="col-md-6 pb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Filter by title"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <div className="col-md-6 pb-2">
              <select
                className="form-select"
                value={selectedDropdownCategory}
                onChange={(e) => setSelectedDropdownCategory(e.target.value)}
              >
                <option value="">All</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div> */}
        {loading || pageChanging ? (
          <Loading />
        ) : (
          <>
            <div className="row">
              {artworks.map((artwork) => (
                <div
                  key={artwork.id}
                  className="col-lg-3 col-md-6 col-12 card-wrapper"
                >
                  <div className="card shadow-sm">
                    {artwork.image_url ? <Link
                      to={`/artwork/${artwork.id}`}
                      className="text-decoration-none"
                    >
                      <img
                        src={
                          artwork.image_url || "default_image.png"
                        }
                        alt={artwork.title || "Artwork thumbnail"}
                        className="card_img_link card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          {artwork.title.length > 200
                            ? `${artwork.title.substring(0, 197)}...`
                            : artwork.title}
                        </h5>
                        <div className="badge-group">
                          {artwork.category_titles?.map(
                            (category: string, index: number) => (
                              <Badge key={index} tag={category} />
                            )
                          ) || "Unknown Category"}
                        </div>
                      </div>
                    </Link> :
                      <div>
                        <img
                          src={
                            artwork.image_url || "default_image.png"
                          }
                          alt={artwork.title || "Artwork thumbnail"}
                          className="card-img-top"
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            {artwork.title.length > 200
                              ? `${artwork.title.substring(0, 197)}...`
                              : artwork.title}
                          </h5>
                          <div className="badge-group">
                            {artwork.category_titles?.map(
                              (category: string, index: number) => (
                                <Badge key={index} tag={category} />
                              )
                            ) || "Unknown Category"}
                          </div>
                        </div>
                      </div>
                    }
                    <div className="art-location mt-3">
                      <Badge key={1} tag={artwork.location_name} />
                    </div>

                  </div>
                </div>
              ))}
            </div>
            <div className="createdDate">
              <p>cached at {pageCachedAt}</p>
            </div>
            {renderArea}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ArtworkList;
