// src/pages/MovieManager.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import { MovieProvider } from '../contexts/MovieContext';
import MovieForm from '../components/MovieForm';
import MovieTable from '../components/MovieTable';
import MovieDetailModal from '../components/MovieDetailModal'; 
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

// Component con hiển thị nội dung, được bọc bởi Provider
const MovieManagerContent = () => {
  const state = useMovieState();
  const { dispatch } = useMovieDispatch();

  const currentGenre = state.genres.find(
    (g) => g.id === state.currentMovie.genreId
  );

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">🎬 Quản lý Phim (Context + useReducer + Axios)</h1>

      {/* Form thêm/sửa phim */}
      <MovieForm />

      <h2 className="mt-4">Danh sách Phim</h2>

      {/* Bảng danh sách phim */}
      <MovieTable />

      {/* 👁 Modal xem chi tiết phim */}
      <MovieDetailModal
        show={state.showDetailModal}
        onClose={() => dispatch({ type: 'CLOSE_DETAIL_MODAL' })}
        movie={state.currentMovie}
        genreName={currentGenre ? currentGenre.name : ''}
      />
    </Container>
  );
};

// Component chính cung cấp Context
const MovieManager = () => (
  <MovieProvider>
    <MovieManagerContent />
  </MovieProvider>
);

export default MovieManager;
