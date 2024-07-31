import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchArtworkDetails } from "../api/artworks";
import { getImageUrl } from "../api/imageUtils";
import Header from "./Header";
import Loading from "./Loading";
import Footer from "./Footer";

const ArtworkDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artwork, setArtwork] = useState<any>(null);
  const [form, setForm] = useState({
    email: "",
    name: "",
    text: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    name: "",
    text: "",
  });
  const [comments, setComments] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getArtwork = async () => {
      if (id) {
        const data = await fetchArtworkDetails(parseInt(id));
        setArtwork(data.data);
      }
    };
    getArtwork();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      name: "",
      text: "",
    };
    let isValid = true;

    if (!form.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!form.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!form.text) {
      newErrors.text = "Comment is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form logic

      const newComment = {
        id: Date.now(),
        email: form.email,
        name: form.name,
        text: form.text,
      };
      console.log("Form submitted:", form);
      setComments([...comments, newComment]);
      setForm({ email: "", name: "", text: "" });
    }
  };

  return (
    <>
      <Header />
      <div className="container py-4">
        {!artwork && <Loading />}
        {artwork && (
          <>
            <button
              onClick={() => navigate(-1)}
              className="btn btn-secondary my-3"
            >
              Back
            </button>
            <div className="row">
              <div className="col-md-6 mb-4">
                <img
                  src={
                    artwork.image_id
                      ? getImageUrl(artwork.image_id)
                      : "default_image.png"
                  }
                  alt={artwork.title ?? "Artwork thumbnail"}
                  className="img-fluid"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="col-md-6">
                <h2>{artwork.title}</h2>
                <p>
                  <strong>Artist:</strong> {artwork.artist_display}
                </p>
                <p>
                  <strong>Date:</strong> {artwork.date_display}
                </p>
                <p>
                  <strong>Reference Number:</strong>{" "}
                  {artwork.main_reference_number}
                </p>
                <p>
                  <strong>Dimensions:</strong> {artwork.dimensions}
                </p>
                <div className="pb-4">
                  {artwork.category_titles?.length
                    ? artwork.category_titles.map(
                        (category: string, index: number) => (
                          <span key={index} className="badge bg-secondary me-1">
                            {category}
                          </span>
                        )
                      )
                    : "Unknown Category"}
                </div>
                <hr className="mt-4" />
                <div className="mt-4">
                  <h4>Comments</h4>

                  {comments.length === 0 ? (
                    <p>No comments yet!</p>
                  ) : (
                    comments.map((comment) => (
                      <>
                        <div key={comment.id} className="mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">
                              <img src={"../default_image.png"} className="avatar"/>{' '}{comment.name}</h5>
                            <span className="text-secondary">{comment.email}</span>
                          </div>
                          <p className="mt-2 bg-light p-2 text-secondary text-muted fst-italic">{comment.text}</p>
                          <hr />
                        </div>
                      </>
                    ))
                  )}

                  <h4>Leave a Comment</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.email && (
                        <div className="text-danger error">{errors.email}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.name && (
                        <div className="text-danger error">{errors.name}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="text" className="form-label">
                        Comment
                      </label>

                      <textarea
                        id="text"
                        name="text"
                        value={form.text}
                        onChange={handleChange}
                        rows={4}
                        className="form-control"
                      />
                      {errors.text && (
                        <div className="text-danger error">{errors.text}</div>
                      )}
                    </div>
                    <button type="submit" className="btn btn-success">
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ArtworkDetail;
