import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Spinner } from "react-bootstrap";

// URL API json-server
const API_ENDPOINT = "http://localhost:3001/movies";

const CRUDMovieExample = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    genreId: "",
    year: "",
    country: "",
    duration: "",
  });
  const [editMovie, setEditMovie] = useState(null);

  // 🟢 READ - Lấy danh sách phim
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_ENDPOINT);
      if (!response.ok) throw new Error(`Lỗi HTTP: ${response.status}`);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách phim:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // 🟢 CREATE - Thêm phim mới
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });
      if (!response.ok) throw new Error("Thêm phim thất bại.");
      const createdMovie = await response.json();
      console.log("Phim đã được tạo:", createdMovie);
      setNewMovie({ title: "", description: "", genreId: "", year: "", country: "", duration: "" });
      fetchMovies();
    } catch (error) {
      console.error("Lỗi khi thêm phim:", error);
    }
  };

  // 🟡 UPDATE - Cập nhật phim
  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editMovie),
      });
      if (!response.ok) throw new Error(`Cập nhật phim ID ${id} thất bại.`);
      console.log(`Phim ID ${id} đã được cập nhật.`);
      setEditMovie(null);
      fetchMovies();
    } catch (error) {
      console.error("Lỗi khi cập nhật phim:", error);
    }
  };

  // 🔴 DELETE - Xóa phim
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Xóa phim ID ${id} thất bại.`);
      console.log(`Phim ID ${id} đã được xóa.`);
      setMovies(movies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa phim:", error);
    }
  };

  // 🧱 Render UI
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">🎬 Demo CRUD với json-server</h2>

      {/* Form thêm phim */}
      <Form onSubmit={handleCreate} className="border p-3 rounded bg-light">
        <h5>Thêm Phim Mới</h5>
        <Form.Group className="mb-2">
          <Form.Label>Tên phim</Form.Label>
          <Form.Control
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
            placeholder="Nhập tên phim..."
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            as="textarea"
            value={newMovie.description}
            onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
            placeholder="Nhập mô tả..."
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Thể loại (genreId)</Form.Label>
          <Form.Control
            type="number"
            value={newMovie.genreId}
            onChange={(e) => setNewMovie({ ...newMovie, genreId: e.target.value })}
            placeholder="1 = Sci-Fi, 2 = Comedy, ..."
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Năm</Form.Label>
          <Form.Control
            type="number"
            value={newMovie.year}
            onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
            placeholder="Ví dụ: 2024"
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Quốc gia</Form.Label>
          <Form.Control
            value={newMovie.country}
            onChange={(e) => setNewMovie({ ...newMovie, country: e.target.value })}
            placeholder="Nhập quốc gia..."
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Thời lượng (phút)</Form.Label>
          <Form.Control
            type="number"
            value={newMovie.duration}
            onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })}
            placeholder="VD: 120"
            required
          />
        </Form.Group>

        <Button variant="success" type="submit">
          ➕ Thêm phim
        </Button>
      </Form>

      {/* Danh sách phim */}
      <h4 className="mt-5 mb-3">📋 Danh sách phim</h4>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên Phim</th>
              <th>Thể loại</th>
              <th>Năm</th>
              <th>Quốc gia</th>
              <th>Thời lượng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>
                  {editMovie?.id === movie.id ? (
                    <Form.Control
                      value={editMovie.title}
                      onChange={(e) => setEditMovie({ ...editMovie, title: e.target.value })}
                    />
                  ) : (
                    movie.title
                  )}
                </td>
                <td>{movie.genreId}</td>
                <td>{movie.year}</td>
                <td>{movie.country}</td>
                <td>{movie.duration}</td>
                <td>
                  {editMovie?.id === movie.id ? (
                    <>
                      <Button size="sm" variant="warning" onClick={() => handleUpdate(movie.id)}>
                        Lưu
                      </Button>{" "}
                      <Button size="sm" variant="secondary" onClick={() => setEditMovie(null)}>
                        Hủy
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => setEditMovie(movie)}
                        className="me-2"
                      >
                        Sửa
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(movie.id)}
                      >
                        Xóa
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default CRUDMovieExample;
