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

function calculateWithReduction(value, quantity: number, vat: string, discount: string) {
    const priceVAT = calculateWithVAT(value, quantity, vat);
    const result = extractValueWithoutCurrency(priceVAT);
    const discountValue = extractValueWithoutCurrency(discount) / 100;
    return (result * (1 - discountValue)).toFixed(2) + "€";
}

function calculatePrice(articlePrice: string, quantity: number, vat: string | undefined, discount: string | undefined) {
    const value = extractValueWithoutCurrency(articlePrice);
    if (discount) return calculateWithReduction(value, quantity, vat, discount);
    if (vat) return calculateWithVAT(value, quantity, vat);
    return valueTimesQty(value, quantity) + "€";
}

interface InputCalculate {
    articlePrice: string
    quantity: number
    vat?: string
    discount?: string
}

describe('Kata', () => {
    const articlePrice = "1.21€";
    function actPriceAndExpect(options: InputCalculate, expectedResult) {
        // Act
        const result = calculatePrice(options.articlePrice, options.quantity, options?.vat, options?.discount);

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

    test('withReduction of 3 percent', async () => {
        // Arrange
        const articlePrice = "345.00€";
        const quantity = 5;
        const reductionPrice = "1840.58€";
        const vat = "10%";
        const discount = "3%";

        // Act
        actPriceAndExpect({articlePrice, quantity, vat, discount}, reductionPrice);
    });
});
