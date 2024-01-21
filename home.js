// funzione per recuperare i prodotti dall'API

const fetchProducts = function () {
  const productsEndpoint =
    "https://striveschool-api.herokuapp.com/api/product/";
  const authToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDY5ZjE4N2U1YzAwMTgxNGM2NGQiLCJpYXQiOjE3MDU2NTgwMTUsImV4cCI6MTcwNjg2NzYxNX0.NHXol6Wx9cTpBev6SuDU7tgwWauhLdcZQV9B3mTISuc";
  fetch(productsEndpoint, {
    headers: {
      Authorization: authToken,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Errore nel recupero dei prodotti: ${response.status}`);
      }
    })
    .then((products) => {
      displayProducts(products);
    })
    .catch((error) => {
      console.error("Errore durante il recupero dei prodotti:", error);
    });
};

fetchProducts();

// funzione per visualizzare i prodotti sulla pagina

const displayProducts = function (products) {
  const productListHome = document.getElementById("productListHome");
  productListHome.innerHTML = "";
  products.forEach((product) => {
    const card = createProductCard(product);
    productListHome.appendChild(card);
  });
};

// funzione per creare una card del prodotto

const createProductCard = function (product) {
  const card = document.createElement("div");
  card.className = "col-md-3 product-card";

  card.innerHTML = `
  <div class="card mb-4 shadow-sm h-100" style="background-color: #8b4513;">
  <img src="${product.imageUrl}" class="bd-placeholder-img card-img-top" style="object-fit: cover; height: 200px;" />
  <div class="card-body d-flex flex-column text-center">
        <h5 class="card-title text-white">${product.name}</h5>
        <div class="btn-group-vertical mt-auto">
        <button class="btn btn-sm btn-warning text-dark rounded mb-2 " onclick="redirectToDetails('${product._id}')">
        Scopri di più
        </button>
        <button type="button" class="btn btn-sm btn-warning text-dark rounded" onclick="editProduct('${product._id}')">Modifica</button>
        </div>
        <small class="text-white fw-bold text-center mt-3">Prezzo: ${product.price}€/Kg</small>
      </div>
    </div>`;

  return card;
};

// funzione per reindirizzare alla pagina DETTAGLI con l'ID del prodotto

const redirectToDetails = function (productId) {
  window.location.href = `./dettagli.html?productId=${productId}`;
};
