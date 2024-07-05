const productList = () =>{
    return fetch("http://localhost:3000/products")
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

const createProducts = async (name, price, image) => {
    try {
        const res = await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                price,
                image,
            })
        });
        return await res.json();
    } catch (err) {
        return console.log(err);
    }
}

const deleteProducts = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return await res.json();
    } catch (err) {
        return console.log(err);
    }

}

export const servicesProducts = {
    productList,
    createProducts,
    deleteProducts,
};
