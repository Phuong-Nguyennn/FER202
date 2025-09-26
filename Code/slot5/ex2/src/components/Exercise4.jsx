export function Exercise4() {
  const ages = [33, 12, 20, 16];

  const [first, , third = 0, ...restAges] = ages;

  return (
    <div>
      <h2>Exercise 4: Destructuring Array + Skip + Default</h2>
      <p>First: {first}</p>
      <p>Third: {third}</p>
      <p>Rest Ages: {restAges.join(", ")}</p>
    </div>
  );
}

export default Exercise4;
