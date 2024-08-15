import React, { useEffect, useState } from "react";
import { fetchArtworks } from "../api/artworks";
import { fetchArtworks as fetchAllArtworksBrooklyn } from "../api/artworksBrooklyn";
import { Link, useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Loading from "./Loading";
import { ArtObject } from "../api/ArtObject";
import Badge from "./Badge";

const ArtworkList: React.FC = () => {
  const [artworks, setArtworks] = useState<any[]>([]);
  const [filteredArtworks, setFilteredArtworks] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [pageChanging, setPageChanging] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedDropdownCategory, setSelectedDropdownCategory] =
    useState<string>("");

  const location = useLocation();

  const PAGE_LIMIT = 2
  const PER_PAGE_LIMIT = 12

  useEffect(() => {
    const fetchAllArtworks = async () => {
      setLoading(true);
      const allArtworks: ArtObject[] = [];
      let currentPage = 1;
      let totalPages = 1;

      while (currentPage <= PAGE_LIMIT && currentPage <= totalPages) {
        const data = await fetchArtworks(currentPage, PER_PAGE_LIMIT);
        if (data) {
          allArtworks.push(...data.data);

          totalPages = data.pagination.total_pages;
          currentPage++;
        } else {
          totalPages = 0;
        }
      }

      const data = await fetchAllArtworksBrooklyn(currentPage, PER_PAGE_LIMIT);

      const all = data.data.concat(allArtworks)

      setArtworks(all);
      setFilteredArtworks(all);

      // Extract unique categories from the artworks
      const uniqueCategories = Array.from(
        new Set(allArtworks.flatMap((artwork) => artwork.category_titles || []))
      );

      setCategories(uniqueCategories);
      setTotalPages(Math.ceil(all.length / PER_PAGE_LIMIT));
      setLoading(false);
    };

    fetchAllArtworks();
  }, []);

  useEffect(() => {
    // Parse page number from URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const pageParam = parseInt(queryParams.get("page") || "1", 10);
    if (pageParam >= 1 && pageParam <= totalPages) {
      setPage(pageParam);
    }
  }, [location.search, totalPages]);

  useEffect(() => {
    // Apply filter when filter text changes, category changes, or artworks data changes
    const applyFilter = () => {
      const filtered = artworks.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(filter.toLowerCase()) &&
          (selectedDropdownCategory === "" ||
            artwork.category_titles.includes(selectedDropdownCategory))
      );
      setFilteredArtworks(filtered);
      setTotalPages(Math.ceil(filtered.length / PER_PAGE_LIMIT));
      setPage(1);
    };

    applyFilter();
  }, [filter, selectedDropdownCategory, artworks]);

  const handlePageChange = (newPage: number) => {
    setPageChanging(true);
    window.scrollTo(0, 0);

    setTimeout(() => {
      setPage(newPage);
      setPageChanging(false);

      // Update the URL to reflect the current page
      window.history.pushState(null, "", `?page=${newPage}`);
    }, 100);
  };

  const paginatedArtworks = filteredArtworks.slice((page - 1) * PER_PAGE_LIMIT, page * PER_PAGE_LIMIT);

  const renderPagination = () => {
    const maxPagesToShow = 10;
    const pages = [];
    const effectiveTotalPages = Math.min(totalPages, maxPagesToShow);

    for (let i = 1; i <= effectiveTotalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${i === page ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          <span className="page-link">{i}</span>
        </li>
      );
    }

    return <ul className="pagination justify-content-center my-4">{pages}</ul>;
  };

  return (
    <>
      <Header />
      <div className="container pt-4">
        <div className="mb-4 mt-4">
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
        </div>
        {loading || pageChanging ? (
          <Loading />
        ) : (
          <>
            <div className="row">
              {paginatedArtworks.map((artwork) => (
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
            <nav>{renderPagination()}</nav>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ArtworkList;
