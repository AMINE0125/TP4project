// -------------------------------------------------
// Éléments HTML
// -------------------------------------------------

const ordersTable =
    document.querySelector("#ordersTable");

const resultCount =
    document.querySelector("#resultCount");


// Statistiques
const totalItems =
    document.querySelector("#totalItems");

const paidItems =
    document.querySelector("#paidItems");

const averagePrice =
    document.querySelector("#averagePrice");

const maxPrice =
    document.querySelector("#maxPrice");


// Modal
const modalElement =
    document.querySelector("#orderModal");

const modalTitle =
    document.querySelector("#modalTitle");

const modalImage =
    document.querySelector("#modalImage");

const modalClient =
    document.querySelector("#modalClient");

const modalProduct =
    document.querySelector("#modalProduct");

const modalBrand =
    document.querySelector("#modalBrand");

const modalCategory =
    document.querySelector("#modalCategory");

const modalPrice =
    document.querySelector("#modalPrice");

const modalStock =
    document.querySelector("#modalStock");

const modalStatus =
    document.querySelector("#modalStatus");

const modalPaid =
    document.querySelector("#modalPaid");

const modalDate =
    document.querySelector("#modalDate");

const modalDescription =
    document.querySelector("#modalDescription");


// Instance Bootstrap
const orderModal =
    new bootstrap.Modal(modalElement);


// -------------------------------------------------
// Création d'une ligne de commande
// -------------------------------------------------

const createOrderRow = (item) => {

    const paymentText =
        item.paid
            ? "Payée"
            : "Non payée";


    const paymentClass =
        item.paid
            ? "paid"
            : "not-paid";


    const statusClass =
        item.status === "Livrée"
            ? "status-delivered"

            : item.status === "En attente"
                ? "status-pending"

                : "status-cancelled";


    return `

        <tr>

            <td>
                ${item.id}
            </td>


            <td>
                <strong>
                    ${item.client}
                </strong>
            </td>


            <td>

                <div class="product-cell">

                    <img
                        src="${item.image}"
                        alt="${item.product}"
                        class="table-product-image"
                    >

                    <div>

                        <strong>
                            ${item.product}
                        </strong>

                        <small>
                            ${item.category}
                        </small>

                    </div>

                </div>

            </td>


            <td>
                ${item.brand}
            </td>


            <td>
                ${item.price} DH
            </td>


            <td>

                <span class="status-badge ${statusClass}">
                    ${item.status}
                </span>

            </td>


            <td>

                <span class="payment-badge ${paymentClass}">
                    ${paymentText}
                </span>

            </td>


            <td>
                ${item.date}
            </td>


            <td>

                <button
                    class="btn btn-sm btn-primary details-btn"
                    data-id="${item.id}"
                >
                    Voir détail
                </button>

            </td>

        </tr>

    `;
};


// -------------------------------------------------
// Affichage des commandes
// map()
// -------------------------------------------------

export const renderItems = (items) => {

    resultCount.textContent =
        `${items.length} commande(s) affichée(s)`;


    if (items.length === 0) {

        ordersTable.innerHTML = `

            <tr>

                <td
                    colspan="9"
                    class="text-center py-5"
                >

                    <div class="empty-state">

                        Aucune commande trouvée.

                        <br>

                        Essayez un autre client
                        ou changez les filtres.

                    </div>

                </td>

            </tr>

        `;

        return;
    }


    ordersTable.innerHTML =
        items
            .map(createOrderRow)
            .join("");
};


// -------------------------------------------------
// Statistiques
// filter()
// forEach()
// map()
// -------------------------------------------------

export const renderStats = (items) => {

    // Nombre total
    totalItems.textContent =
        items.length;


    // Commandes payées
    const paid =
        items.filter(
            item => item.paid
        );

    paidItems.textContent =
        paid.length;


    // Prix moyen
    let sum = 0;


    items.forEach(item => {

        sum += item.price;

    });


    const average =
        items.length > 0
            ? Math.round(
                sum / items.length
            )
            : 0;


    averagePrice.textContent =
        `${average} DH`;


    // Prix maximum
    const prices =
        items.map(
            item => item.price
        );


    const maximum =
        prices.length > 0
            ? Math.max(...prices)
            : 0;


    maxPrice.textContent =
        `${maximum} DH`;
};


// -------------------------------------------------
// Affichage du détail
// -------------------------------------------------

export const renderDetail = (item) => {

    // Titre
    modalTitle.textContent =
        item.product;


    // Photo
    modalImage.src =
        item.image;

    modalImage.alt =
        item.product;


    // Informations
    modalClient.textContent =
        item.client;


    modalProduct.textContent =
        item.product;


    modalBrand.textContent =
        item.brand;


    modalCategory.textContent =
        item.category;


    modalPrice.textContent =
        `${item.price} DH`;


    modalStock.textContent =
        item.stock > 0
            ? `${item.stock} disponible(s)`
            : "Rupture de stock";


    modalStatus.textContent =
        item.status;


    modalPaid.textContent =
        item.paid
            ? "Payée"
            : "Non payée";


    modalDate.textContent =
        item.date;


    modalDescription.textContent =
        item.description;


    // Ouvrir la fenêtre
    orderModal.show();
};