import {Article, calculatePrice} from "../src/calculatePrice";

describe('Calculate Price', () => {
    test.each([
        {
            cart: [],
            expectedTotalPriceHT: "0.00€",
            expectedTotalPriceTTC: "0.00€"
        },
        {
            cart: [new Article("1.21€")],
            expectedTotalPriceHT: "1.21€",
            expectedTotalPriceTTC: "1.21€"
        },
        {
            cart: [new Article("1.21€"), new Article("1.21€")],
            expectedTotalPriceHT: "2.42€",
            expectedTotalPriceTTC: "2.42€"
        },
        {
            cart: [new Article("1.21€", "5%"), new Article("1.21€", "5%"), new Article("1.21€", "5%")],
            expectedTotalPriceHT: "3.63€",
            expectedTotalPriceTTC: "3.81€"
        },
        {
            cart: [new Article("1.21€", "20%"), new Article("1.21€", "20%"), new Article("1.21€", "20%")],
            expectedTotalPriceHT: "3.63€",
            expectedTotalPriceTTC: "4.36€"
        }
    ])('it should calculate cart $cart : $expectedTotalPriceHT (HT) $expectedTotalPriceTTC (TTC)', (cases) => {
        // Arrange
        const {cart, expectedTotalPriceHT, expectedTotalPriceTTC} = cases;

        // Act
        const result = calculatePrice(cart);

        // Assert
        expect(result).toEqual({
            totalPriceHT: expectedTotalPriceHT,
            totalPriceTTC: expectedTotalPriceTTC
        });
    });
});
