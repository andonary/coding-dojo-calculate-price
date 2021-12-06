import _ from "lodash";

function calculatePrice(articlePrice: string, quantity: number) {
    const value = _.toNumber(articlePrice.substring(0, articlePrice.length - 1));
    return value * quantity + "€";
}

interface InputCalculate {
    articlePrice: string,
    quantity: number
}

describe('Kata', () => {
    const articlePrice = "1.21€";
    function actPriceAndExpect(options: InputCalculate, expectedResult) {
        // Act
        const result = calculatePrice(options.articlePrice, options.quantity);

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
});
