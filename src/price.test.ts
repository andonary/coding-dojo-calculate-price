function computePrice(quantity: number, priceUnit: number, taxInPercent: number) {
    let price = quantity * priceUnit;
    if (price > 1000) {
        let reduction = 3;
        price = price * (1 - reduction/100)
    }
    return (price * (1 + taxInPercent/100)).toFixed(2) + " €"
}

describe('Price', function () {
    it('should compute price without tax', function () {
        const price = computePrice(3, 1.21, 0);
        expect(price).toEqual("3.63 €");
    });

    it('should compute price with tax', function () {
        const price = computePrice(3, 1.21, 5);
        expect(price).toEqual("3.81 €");
    });

    it('should compute price with tax', function () {
        const price = computePrice(5, 345, 10);
        expect(price).toEqual("1840.58 €");
    });
});