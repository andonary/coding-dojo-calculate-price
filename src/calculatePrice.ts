export class Article {
    constructor(public price: string, public tva: string = "0%") {

    }

}

function getMoney(totalPriceHT: string = "0") {
    return totalPriceHT.substring(0, totalPriceHT.length - 1);
}

function convertToNumber(priceWithCurrency: string) {
    return Number(getMoney(priceWithCurrency));
}

export function calculatePrice(cart: Article[]) {
    const currency = "€";
    let totalPriceHT: number = 0;
    let totalPriceTTC: number = 0;
    for (const article of cart) {
        totalPriceHT += convertToNumber(article?.price);
        const tva: number = convertToNumber(article?.tva);
        totalPriceTTC += convertToNumber(article?.price) * (1 + tva / 100);
    }
    return {
        totalPriceHT: totalPriceHT.toFixed(2) + currency,
        totalPriceTTC: totalPriceTTC.toFixed(2) + currency
    }
}
