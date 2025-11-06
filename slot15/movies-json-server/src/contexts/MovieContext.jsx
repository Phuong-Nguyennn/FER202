// src/contexts/MovieContext.jsx
import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';
import { movieReducer, initialMovieState } from '../reducers/movieReducers';
import movieApi from '../api/movieAPI';

// Contexts
export const MovieStateContext = createContext(initialMovieState);
export const MovieDispatchContext = createContext(null);

// Custom Hooks
export const useMovieState = () => useContext(MovieStateContext);
export const useMovieDispatch = () => useContext(MovieDispatchContext);

// Provider
export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialMovieState);

  // GET movies
  const fetchMovies = useCallback(async () => {
    dispatch({ type: 'START_LOADING' });
    try {
      const res = await movieApi.get('/movies');
      dispatch({ type: 'SET_MOVIES', payload: res.data });
    } catch (err) {
      console.error('Lỗi khi tải phim:', err);
      dispatch({ type: 'SET_MOVIES', payload: [] });
    }
  }, [dispatch]);

  // GET genres
  const fetchGenres = useCallback(async () => {
    try {
      const res = await movieApi.get('/genres');
      dispatch({ type: 'SET_GENRES', payload: res.data });
    } catch (err) {
      console.error('Lỗi khi tải thể loại:', err);
      dispatch({ type: 'SET_GENRES', payload: [] });
    }
  }, [dispatch]);

  // DELETE movie
  const confirmDelete = useCallback(
    async (id) => {
      dispatch({ type: 'CLOSE_DELETE_MODAL' });
      dispatch({ type: 'START_LOADING' });
      try {
        await movieApi.delete(`/movies/${id}`);
        fetchMovies();
      } catch (err) {
        console.error('Lỗi khi xóa phim:', err);
        fetchMovies();
      }
    },
    [fetchMovies]
  );

  // CREATE or UPDATE movie
  const handleCreateOrUpdate = useCallback(
    async (dataToSend, isEditing, isEditingId) => {
      dispatch({ type: 'START_LOADING' });
      try {
        if (isEditing) {
          await movieApi.put(`/movies/${isEditingId}`, dataToSend);
        } else {
          await movieApi.post('/movies', dataToSend);
        }
        dispatch({ type: 'RESET_FORM' });
        fetchMovies();
        return true;
      } catch (err) {
        console.error('Lỗi thao tác CREATE/UPDATE:', err);
        fetchMovies();
        return false;
      }
    },
    [fetchMovies]
  );

  // OPEN detail modal
  const openDetailModal = (movie) => {
    dispatch({ type: 'OPEN_DETAIL_MODAL', payload: movie });
  };

  // CLOSE detail modal
  const closeDetailModal = () => {
    dispatch({ type: 'CLOSE_DETAIL_MODAL' });
  };

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [fetchMovies, fetchGenres]);

  const dispatchValue = {
    dispatch,
    fetchMovies,
    fetchGenres,
    confirmDelete,
    handleCreateOrUpdate,
    openDetailModal,
    closeDetailModal,
  };

  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatchValue}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};
