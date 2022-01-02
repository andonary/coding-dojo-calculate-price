import {Article, calculateTotalPrice} from "../src/calculatePrice";

describe('Calculate price', () => {
    test.each([
        {
            cart: [],
            expectedTotalPriceHT: "0.00€",
            expectedTotalPriceTTC: "0.00€"
        },
        {
            cart: [new Article("1.21€", "5%")],
            expectedTotalPriceHT: "1.21€",
            expectedTotalPriceTTC: "1.27€"
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
        },
        {
            cart: [new Article("345€", "10%"), new Article("345€", "10%"), new Article("345€", "10%"), new Article("345€", "10%"), new Article("345€", "10%")],
            expectedTotalPriceHT: "1725.00€",
            expectedTotalPriceTTC: "1840.58€",
            reduction: "3%"
        },
        {
            cart: [new Article("1299€", "10%"), new Article("1299€", "10%"), new Article("1299€", "10%"), new Article("1299€", "10%"), new Article("1299€", "10%")],
            expectedTotalPriceHT: "6495.00€",
            expectedTotalPriceTTC: "6787.28€",
            reduction: "5%"
        }
    ])('it should calculate my cart $cart to: $expectedTotalPriceHT (HT) $expectedTotalPriceTTC (TTC)', async (cases) => {
        // Arrange
        const {cart, expectedTotalPriceHT, expectedTotalPriceTTC, reduction} = cases

        // Act
        const result = calculateTotalPrice(cart, reduction);

        // Assert
        expect(result).toEqual(
            {
                totalPriceHT: expectedTotalPriceHT,
                totalPriceTTC: expectedTotalPriceTTC
            }
        )
    });
});

