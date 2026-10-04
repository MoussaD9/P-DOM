// Attente du chargement complet du DOM
document.addEventListener("DOMContentLoaded", function () {
    
    // Sélection du total
    const totalElement = document.querySelector(".total");

    // Sélection de toutes les cartes de produits
    const cards = document.querySelectorAll(".list-products > .card-body");

    cards.forEach((card) => {
        // 1. Bouton + (Augmenter la quantité)
        const plusBtn = card.querySelector(".fa-plus-circle");
        plusBtn.addEventListener("click", function () {
            const quantityElement = card.querySelector(".quantity");
            let quantity = parseInt(quantityElement.textContent);
            quantityElement.textContent = quantity + 1;
            calculerTotal();
        });

        // 1. Bouton - (Diminuer la quantité)
        const minusBtn = card.querySelector(".fa-minus-circle");
        minusBtn.addEventListener("click", function () {
            const quantityElement = card.querySelector(".quantity");
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 0) {
                quantityElement.textContent = quantity - 1;
                calculerTotal();
            }
        });

        // 2. Bouton Supprimer (Supprimer l'article)
        const deleteBtn = card.querySelector(".fa-trash-alt");
        deleteBtn.addEventListener("click", function () {
            card.remove();
            calculerTotal();
        });

        // 3. Bouton Cœur (Aimer / Changer de couleur)
        const heartBtn = card.querySelector(".fa-heart");
        heartBtn.addEventListener("click", function () {
            if (heartBtn.style.color === "red") {
                heartBtn.style.color = "black";
            } else {
                heartBtn.style.color = "red";
            }
        });
    });

    // 4. Fonction pour calculer et ajuster le prix total
    function calculerTotal() {
        const remainingCards = document.querySelectorAll(".list-products > .card-body");
        let somme = 0;

        remainingCards.forEach((card) => {
            const unitPriceText = card.querySelector(".unit-price").textContent;
            // Extraction de la valeur numérique du prix (ex: "100 $" -> 100)
            const unitPrice = parseFloat(unitPriceText.replace("$", "").trim());
            const quantity = parseInt(card.querySelector(".quantity").textContent);

            somme += unitPrice * quantity;
        });

        totalElement.textContent = somme + " $";
    }

    // Calcul initial au chargement de la page
    calculerTotal();
});