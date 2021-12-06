> Coding-dojo "démonstration" lors de notre session à Agile Grenoble

# Séance du 24/11/2021

## Sujet : Calcul de prix

Calculer le prix selon 3 données : nombre d’articles, prix unitaire, et taux de TVA.

Une réduction est appliquée selon le montant total de la commande (voir tableau).

| Valeur de commande | Réduction |
|--------------------|:---------:|
| > 1000 €           | 3%        |
| > 5000 €           | 5%        |
| > 10000 €          | 7%        |
| > 15000 €          | 11%       |


## Exemples

Prix sans réduction :

* HT : 3 articles à 1,21 € + 0 % ⇒ "3.63 €"
* TTC : 3 articles à 1,21 €  + 5 % ⇒ "3.81 €"
* TTC : 3 articles à 1,21 €  +20 % ⇒ "4.36 €"

Prix avec réductions :

* \> 1000 € → Remise 3% :
    * Ex : 5 x 345,00 € + taxe 10% → 1840.58 €
* \> 5000 € → Remise 5% :
    * Ex : 5 x 1299,00 € + taxe 10% → 6787.28 €
