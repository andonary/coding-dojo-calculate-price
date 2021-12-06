import _ from "lodash";

function calculatePrice(articlePrice: string, quantity: number) {
    const value = _.toNumber(articlePrice.substring(0, articlePrice.length - 1));
    return value * quantity + "€";
}

describe('Kata', () => {
    test('no reduction 3*1.21 equals 3.63€', async () => {
        // Arrange
        const articlePrice = "1.21€";
        const quantity = 3;
        const noreductionPrice = "3.63€";

        // Act
        const result = calculatePrice(articlePrice, quantity);

        // Assert
        expect(result).toEqual(noreductionPrice);
    });

    test('no reduction 1*1.21 equals 1.21€', async () => {
        // Arrange
        const articlePrice = "1.21€";
        const quantity = 1;
        const noreductionPrice = "1.21€";

        // Act
        const result = calculatePrice(articlePrice, quantity);

        // Assert
        expect(result).toEqual(noreductionPrice);
    });
});
