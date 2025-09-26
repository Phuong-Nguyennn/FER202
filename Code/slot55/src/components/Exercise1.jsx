function Exercise1(){

        //tinh ham double
        const hamDouble = x => x * 2;
        //ham kiem tra so chan
        const isEven = x => x % 2 === 0;
    return (
        <div>
            <h2>Exercise 1</h2>
            <p>Ket qua hamDouble(5): {hamDouble(5)}</p>
            <p>Ket qua isEven(4): {isEven(4).toString()? "So chan" : "so le"}</p>

        </div>
    );
}
export default Exercise1;