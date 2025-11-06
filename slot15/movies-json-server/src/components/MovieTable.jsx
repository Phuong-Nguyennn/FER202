// src/components/MovieTable.jsx
import React from 'react';
import { Table, Button, Image, Modal, Alert, Spinner, Badge } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const MovieTable = () => {
  const state = useMovieState();
  const { dispatch, confirmDelete } = useMovieDispatch();

  const { movies, genres, loading, movieToDelete, showDeleteModal } = state;

  // Map genreId → genreName
  const genreMap = genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});

  // Badge màu theo thể loại
  const getCategoryBadgeVariant = (genreName) => {
    const categoryColors = {
      'Sci-Fi': 'primary',
      'Comedy': 'warning',
      'Drama': 'info',
      'Horror': 'dark',
      'Romance': 'danger',
      'Action': 'success',
      'Thriller': 'secondary',
    };
    return categoryColors[genreName] || 'secondary';
  };

  // Xử lý nút sửa
  const handleEditClick = (movie) => {
    dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
  };

  // Xử lý nút xóa
  const handleDeleteClick = (movie) => {
    dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });
  };

  // ✅ Xử lý nút xem chi tiết
  const handleViewClick = (movie) => {
    dispatch({ type: 'OPEN_DETAIL_MODAL', payload: movie });
  };

  return (
    <>
      {loading && movies.length === 0 ? (
        <div className="text-center my-4">
          <Spinner animation="border" role="status" variant="primary" className="me-2" />
          <Alert variant="info" className="mt-3">
            Đang tải dữ liệu phim...
          </Alert>
        </div>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>ID</th>
              <th>Tên Phim</th>
              <th>Danh mục</th>
              <th>Thời lượng</th>
              <th>Năm</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => {
              const genreName = genreMap[movie.genreId] || 'Unknown';
              return (
                <tr key={movie.id}>
                  <td>
                    <Image
                      src={movie.avatar}
                      alt={movie.title}
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      rounded
                    />
                  </td>
                  <td>#{movie.id}</td>
                  <td>
                    <strong>{movie.title}</strong>
                    <br />
                    <small className="text-muted">({movie.year})</small>
                  </td>
                  <td>
                    <Badge bg={getCategoryBadgeVariant(genreName)}>{genreName}</Badge>
                  </td>
                  <td>{movie.duration} phút</td>
                  <td>{movie.country}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleViewClick(movie)}
                      className="me-2"
                    >
                      Xem
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEditClick(movie)}
                      className="me-2"
                    >
                      Sửa
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(movie)}>
                      Xóa
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      {/* MODAL XÁC NHẬN XÓA */}
      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận Xóa Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa phim{' '}
          <strong>{movieToDelete?.title}</strong> (ID: {movieToDelete?.id}) không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
            Hủy bỏ
          </Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>
            Xác nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;
