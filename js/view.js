const ordersTable =
    document.querySelector("#ordersTable");

const resultCount =
    document.querySelector("#resultCount");

const totalCustomers =
    document.querySelector("#totalCustomers");

const totalProducts =
    document.querySelector("#totalProducts");

const totalOrders =
    document.querySelector("#totalOrders");

const totalAmount =
    document.querySelector("#totalAmount");

const categorySelect =
    document.querySelector("#categorySelect");

const errorMessage =
    document.querySelector("#errorMessage");

const modalElement =
    document.querySelector("#orderModal");

const modalTitle =
    document.querySelector("#modalTitle");

const modalClient =
    document.querySelector("#modalClient");

const modalCity =
    document.querySelector("#modalCity");

const modalDate =
    document.querySelector("#modalDate");

const modalStatus =
    document.querySelector("#modalStatus");

const modalProducts =
    document.querySelector("#modalProducts");

const modalTotal =
    document.querySelector("#modalTotal");

const orderModal =
    new bootstrap.Modal(modalElement);


const getStatusClass = (status) => {

    if (status === "Livree") {
        return "status-delivered";
    }

    if (status === "En attente") {
        return "status-pending";
    }

    return "status-cancelled";
};


const createOrderRow = (details) => {

    const { order, customer, items, total } =
        details;

    const productsText =
        items
            .map(item =>
                `${item.product.name} x ${item.quantity}`
            )
            .join(", ");

    return `
        <tr>
            <td>${order.id}</td>

            <td>
                <strong>${customer.name}</strong>
                <small class="d-block text-muted">
                    ${customer.city}
                </small>
            </td>

            <td>${productsText}</td>

            <td>
                <span class="status-badge ${getStatusClass(order.status)}">
                    ${order.status}
                </span>
            </td>

            <td>${total} DH</td>

            <td>${order.date}</td>

            <td>
                <button
                    class="btn btn-sm btn-primary details-btn"
                    data-id="${order.id}"
                >
                    Voir détail
                </button>
            </td>
        </tr>
    `;
};


export const renderOrders = (ordersDetails) => {

    resultCount.textContent =
        `${ordersDetails.length} commande(s) affichée(s)`;


    if (ordersDetails.length === 0) {

        ordersTable.innerHTML = `
            <tr>
                <td colspan="7"
                    class="text-center py-5">
                    <div class="empty-state">
                        Aucune commande trouvée.
                    </div>
                </td>
            </tr>
        `;

        return;
    }


    ordersTable.innerHTML =
        ordersDetails
            .map(createOrderRow)
            .join("");
};


export const renderStats = (stats) => {

    totalCustomers.textContent =
        stats.totalCustomers;

    totalProducts.textContent =
        stats.totalProducts;

    totalOrders.textContent =
        stats.totalOrders;

    totalAmount.textContent =
        `${stats.totalAmount} DH`;
};


export const renderCategories = (categories) => {

    categorySelect.innerHTML = `
        <option value="all">
            Toutes les catégories
        </option>
    `;

    categories.forEach(category => {

        categorySelect.innerHTML += `
            <option value="${category}">
                ${category}
            </option>
        `;
    });
};


export const renderDetail = (details) => {

    const {
        order,
        customer,
        items,
        total
    } = details;


    modalTitle.textContent =
        `Commande #${order.id}`;

    modalClient.textContent =
        customer.name;

    modalCity.textContent =
        customer.city;

    modalDate.textContent =
        order.date;

    modalStatus.textContent =
        order.status;


    modalProducts.innerHTML =
        items
            .map(item => `
                <div class="info-row">
                    <span>
                        ${item.product.name}
                        x ${item.quantity}
                    </span>

                    <strong>
                        ${item.lineTotal} DH
                    </strong>
                </div>
            `)
            .join("");


    modalTotal.textContent =
        `${total} DH`;

    orderModal.show();
};


export const showError = (message) => {

    errorMessage.textContent = message;

    errorMessage.classList.remove("d-none");
};