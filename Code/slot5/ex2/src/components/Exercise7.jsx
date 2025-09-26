export function Exercise7() {
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
  ];

  const company0New = { ...companies[0], start: companies[0].start + 1 };

  function concatAll(...arrays) {
    return arrays.flat();
  }

  const concatResult = concatAll([1, 2], [3], [4, 5]);

  return (
    <div>
      <h2>Exercise 7: Spread vs. Rest</h2>

      <p>
        <b>Original company[0]:</b> {companies[0].name} - {companies[0].start}
      </p>
      <p>
        <b>New company0:</b> {company0New.name} - {company0New.start}
      </p>

      <p>
        <b>concatAll([1,2],[3],[4,5]):</b> {concatResult.join(", ")}
      </p>
    </div>
  );
}

export default Exercise7;
