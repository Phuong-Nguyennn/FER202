// src/components/MovieDetailModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MovieDetailModal = ({ show, onClose, movie, genreName }) => {
  if (!movie) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>🎬 Chi tiết phim</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mb-3">
          <img
            src={movie.poster || movie.avatar || 'https://via.placeholder.com/200x250'}
            alt={movie.title}
            className="img-fluid rounded"
            style={{ maxHeight: '250px' }}
          />
        </div>
        <h5>{movie.title}</h5>
        <p><strong>Thể loại:</strong> {genreName || movie.genreId}</p>
        <p><strong>Mô tả:</strong> {movie.description}</p>
        <p><strong>Thời lượng:</strong> {movie.duration} phút</p>
        <p><strong>Năm:</strong> {movie.year}</p>
        <p><strong>Quốc gia:</strong> {movie.country}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MovieDetailModal;
