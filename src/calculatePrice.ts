import {randomBytes} from "crypto";

export class Article {
    id = randomBytes(32)

    constructor(public price: string, public vat: string = "0%") {
    }
}

function getWithoutCurrency(value: string) {
    return value.substring(0, value.length - 1);
}

export function calculateTotalPrice(cart: Article[], reduction: string = "0%") {
    const currency = "€";
    let totalHT = 0;
    let totalTTC = 0;
    for (const article of cart) {
        const priceArticle = getWithoutCurrency(article.price);
        const vatArticle = getWithoutCurrency(article.vat);
        totalHT += Number(priceArticle);
        totalTTC += Number(priceArticle * (1 + (vatArticle / 100)));
    }
    const reductionNumber: string = getWithoutCurrency(reduction);
    totalTTC = totalTTC * (1 - Number(reductionNumber) / 100);
    totalTTC = Math.round(totalTTC * 100) / 100;
    const totalPriceHT: string = totalHT.toFixed(2) + currency;
    const totalPriceTTC: string = totalTTC.toFixed(2) + currency;
    return {totalPriceHT, totalPriceTTC};
}
