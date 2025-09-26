export function Exercise2() {
  // 1. Tạo mảng số nguyên
  const numbers = [1, 12, -3, 4, 15, 20, -10, 8, 7, 6];

  // 2. Tính tổng
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);

  // 3. Tính giá trị trung bình
  const average = sum / numbers.length;

  // 4. Mảng tên (danh sách sinh viên)
  const names = [
    { id: 1, name: "An", age: 20, grade: 8.5 },
    { id: 2, name: "Sylas", age: 21, grade: 8 },
    { id: 3, name: "Zed", age: 19, grade: 6 },
    { id: 4, name: "Galio", age: 24, grade: 9 },
    { id: 5, name: "Brocoly", age: 22, grade: 7.5 },
  ];

  // Lọc và sắp xếp top sinh viên
  const topStudents = names
    .filter(student => student.grade >= 7.5)
    .sort((a, b) => b.grade - a.grade);

const topAvg =
    topStudents.reduce((acc, curr) => acc + curr.grade, 0) / topStudents.length;

  return (
    <div>
      <h2>Exercise 2</h2>

      <p>In mảng số nguyên</p>
      <ul>
        {numbers.map((num, i) => (
          <li key={i}>Phần tử thứ {i}: {num}</li>
        ))}
      </ul>

      <p>Tổng các phần tử: {sum}</p>
      <p>Giá trị trung bình: {average.toFixed(2)}</p>

      <p>Danh sách tên theo Alphabet:</p>
      <ul>
        {[...names]
          .map(n => n.name)
          .sort()
          .map((n, i) => (
            <li key={i}>{n}</li>
          ))
        }
      </ul>

      <p>Hiển thị danh sách Top Students:</p>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {topStudents.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Điểm trung bình của các student có grade ≥ 7.5: {topAvg.toFixed(2)}</p>
    </div>
  );
}

export default Exercise2;
