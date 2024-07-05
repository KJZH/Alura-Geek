import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");
const deleteButton = document.querySelectorAll(".delete-button");

function createCard(name, price, image, id){
    const card = document.createElement("card");
    card.classList.add("card");
    card.innerHTML = `
        <div class="img-container">
            <img src="${image}" alt="${name}">
        </div>

        <div class="card-container--info">
            <p>"${name}"</p>
            <div class="card-container--value">
                <p>"${price}"</p>
                <button class="delete-button" data-id="${id}">
                    <img id="banner" src="./assets/trashIcon.svg" alt="Eliminar"> 
                </button>
            </div>
        </div>
    `;
    productContainer.appendChild(card);
    return card;
}

const render = async() => {
    try {
        const listProducts = await servicesProducts.productList();
        listProducts.forEach(products => {
            const card = createCard(
                products.name,
                products.price,
                products.image,
                products.id
            );
            productContainer.appendChild(card);


        const deleteButton = card.querySelector(".delete-button");
        deleteButton.addEventListener("click", async () => {
            const id = deleteButton.getAttribute("data-id");
            try {
                await servicesProducts.deleteProducts(id);
                card.remove(); 
            } catch (err) {
                alert(err);
            }
        }); 
    }); 
    } catch (error) {
        console.log(error);
    }
} 

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;
    
    servicesProducts
    .createProducts(name, price, image)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

render();

