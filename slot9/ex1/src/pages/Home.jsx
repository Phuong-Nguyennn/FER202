import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Filter from "../components/Filter/Filter";
import MovieCard from "../components/Movies/MovieCard";
import { movies } from "../data/movies";

export default function Home() {
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const handleSearch = (keyword) => {
    const lower = keyword.toLowerCase();
    setFilteredMovies(
      movies.filter(
        (m) =>
          m.title.toLowerCase().includes(lower) ||
          m.description.toLowerCase().includes(lower)
      )
    );
  };

  const handleFilter = (value) => {
    let result = [...movies];
    if (value === "<=2000") result = movies.filter((m) => m.year <= 2000);
    else if (value === "2001-2015")
      result = movies.filter((m) => m.year >= 2001 && m.year <= 2015);
    else if (value === ">2015") result = movies.filter((m) => m.year > 2015);
    setFilteredMovies(result);
  };

  const handleSort = (value) => {
    const sorted = [...filteredMovies];
    switch (value) {
      case "year-asc":
        sorted.sort((a, b) => a.year - b.year);
        break;
      case "year-desc":
        sorted.sort((a, b) => b.year - a.year);
        break;
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "duration-asc":
        sorted.sort((a, b) => a.duration - b.duration);
        break;
      case "duration-desc":
        sorted.sort((a, b) => b.duration - a.duration);
        break;
      default:
        break;
    }
    setFilteredMovies(sorted);
  };

  return (
    <Container className="mt-3">
      <Filter onSearch={handleSearch} onFilter={handleFilter} onSort={handleSort} />
      <MovieCard movies={filteredMovies} />
    </Container>
  );
}
