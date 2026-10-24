import { state } from "./state.js";

import { fetchData } from "./dataService.js";

import {
    getFilteredOrders,
    getOrderDetails,
    getStatistics,
    getCategories
} from "./selectors.js";

import {
    renderOrders,
    renderStats,
    renderCategories,
    renderDetail,
    showError
} from "./view.js";


const searchInput =
    document.querySelector("#searchInput");

const statusButtons =
    document.querySelectorAll(".status-btn");

const categorySelect =
    document.querySelector("#categorySelect");

const ordersTable =
    document.querySelector("#ordersTable");


const render = () => {

    const filteredOrders =
        getFilteredOrders();

    const ordersDetails =
        filteredOrders.map(order =>
            getOrderDetails(order)
        );

    renderOrders(ordersDetails);

    renderStats(
        getStatistics()
    );
};


searchInput.addEventListener(
    "input",
    event => {

        state.search =
            event.target.value.trim();

        render();
    }
);


statusButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            state.status =
                button.dataset.status;

            statusButtons.forEach(
                currentButton => {
                    currentButton.classList.remove(
                        "active"
                    );
                }
            );

            button.classList.add("active");

            render();
        }
    );
});


categorySelect.addEventListener(
    "change",
    event => {

        state.category =
            event.target.value;

        render();
    }
);


ordersTable.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".details-btn"
            );

        if (!button) {
            return;
        }

        const orderId =
            Number(button.dataset.id);

        const order =
            state.orders.find(
                order => order.id === orderId
            );

        if (!order) {
            return;
        }

        const details =
            getOrderDetails(order);

        renderDetail(details);
    }
);


const init = async () => {

    try {

        const data =
            await fetchData();

        state.customers =
            data.customers;

        state.products =
            data.products;

        state.orders =
            data.orders;


        // Vérification des données chargées
        console.log("Customers :", state.customers);
        console.log("Products :", state.products);
        console.log("Orders :", state.orders);


        renderCategories(
            getCategories()
        );

        render();

    } catch (error) {

        console.error(error);

        showError(
            "Impossible de charger les données. Vérifiez les fichiers JSON et utilisez Live Server."
        );
    }
};


init();