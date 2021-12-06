import _ from "lodash";

function extractValueWithoutCurrency(articlePrice: string) {
    return _.toNumber(articlePrice.substring(0, articlePrice.length - 1));
}

function valueTimesQty(value, quantity: number) {
    return value * quantity;
}

function taxes(vat: string) {
    return 1 + extractValueWithoutCurrency(vat) / 100;
}

function calculateWithVAT(value, quantity: number, vat: string) {
    return (valueTimesQty(value, quantity) * taxes(vat)).toFixed(2) + "€";
}

function calculatePrice(articlePrice: string, quantity: number, vat: string | undefined) {
    const value = extractValueWithoutCurrency(articlePrice);
    if (vat) return calculateWithVAT(value, quantity, vat);
    return valueTimesQty(value, quantity) + "€";
}

interface InputCalculate {
    articlePrice: string,
    quantity: number
    vat?: string
}

describe('Kata', () => {
    const articlePrice = "1.21€";
    function actPriceAndExpect(options: InputCalculate, expectedResult) {
        // Act
        const result = calculatePrice(options.articlePrice, options.quantity, options?.vat);

        // Assert
        expect(result).toEqual(expectedResult);
    }

    test('no reduction 3*1.21 equals 3.63€', async () => {
        // Arrange
        const quantity = 3;
        const noreductionPrice = "3.63€";

        actPriceAndExpect({articlePrice, quantity}, noreductionPrice);
    });

    test('no reduction 1*1.21 equals 1.21€', async () => {
        // Arrange
        const quantity = 1;
        const noreductionPrice = "1.21€";

        actPriceAndExpect({articlePrice, quantity}, noreductionPrice);
    });

    test('no reduction 3*1.21 with 5% VAT equals 3.831€', async () => {
        // Arrange
        const quantity = 3;
        const noreductionPrice = "3.81€";
        const vat = "5%";

        // Act
        actPriceAndExpect({articlePrice, quantity, vat}, noreductionPrice);
    });

    test('no reduction 3*1.21 with 20% VAT equals 4.36€', async () => {
        // Arrange
        const quantity = 3;
        const noreductionPrice = "4.36€";
        const vat = "20%";

        // Act
        actPriceAndExpect({articlePrice, quantity, vat}, noreductionPrice);
    });
});
