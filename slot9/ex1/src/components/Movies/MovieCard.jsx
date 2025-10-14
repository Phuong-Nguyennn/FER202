import React, { useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Badge,
  Modal,
  Toast,
  ToastContainer
} from "react-bootstrap";
import { movies } from "../../data/movies";

export default function MovieCard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleAddToFavourites = (movie) => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    if (!favourites.find((m) => m.id === movie.id)) {
      favourites.push(movie);
      localStorage.setItem("favourites", JSON.stringify(favourites));
      setShowToast(true);
    }
  };

  const handleViewDetails = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  return (
    <>
      <Row xs={1} sm={2} md={3} className="g-4 mt-3">
        {movies.map((movie) => (
          <Col key={movie.id}>
            <Card className="h-100 shadow-sm movie-card">
              <Card.Img
                variant="top"
                src={movie.poster}
                alt={movie.title}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  {movie.title}{" "}
                  <Badge bg="info" text="dark">
                    {movie.genre}
                  </Badge>
                </Card.Title>
                <Card.Text style={{ fontSize: "0.9rem" }}>
                  {movie.description.length > 90
                    ? movie.description.slice(0, 90) + "..."
                    : movie.description}
                </Card.Text>
                <div className="text-muted small mb-2">
                  {movie.year} • {movie.country} • {movie.duration} phút
                </div>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleAddToFavourites(movie)}
                  >
                    Add to Favourites
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleViewDetails(movie)}
                  >
                    View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="success"
          show={showToast}
          delay={2000}
          autohide
          onClose={() => setShowToast(false)}
        >
          <Toast.Body className="text-white">
            ✅ Added to favourites!
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Modal Details */}
      {selectedMovie && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedMovie.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedMovie.poster}
              alt={selectedMovie.title}
              className="img-fluid rounded mb-3"
            />
            <p>{selectedMovie.description}</p>
            <p>
              <strong>Year:</strong> {selectedMovie.year} <br />
              <strong>Country:</strong> {selectedMovie.country} <br />
              <strong>Duration:</strong> {selectedMovie.duration} phút <br />
              <strong>Genre:</strong>{" "}
              <Badge bg="info" text="dark">
                {selectedMovie.genre}
              </Badge>
            </p>
            <p>
              <strong>Showtimes:</strong>{" "}
              {selectedMovie.showtimes
                ? selectedMovie.showtimes.join(", ")
                : "Not available"}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
