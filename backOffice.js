document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("productForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      createProduct();
    });
});

// funzione per il recupero dei prodotti nel back-office

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
        throw new Error(
          `Errore nel recupero dei prodotti: ${response.status} :(`
        );
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

// funzione per la visualizzazione dei prodotti nel back-office

const displayProducts = function (products) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  products.forEach((product) => {
    const card = createProductCard(product);
    productList.appendChild(card);
  });
};

// funzione per la creazione della card

const createProductCard = function (product, destination) {
  const card = document.createElement("div");
  card.className = "col-md-3 mb-4 product-card";

  card.innerHTML = `
  <div class="card mb-4 shadow-sm h-100" style="background-color: #8b4513;">
  <img src="${product.imageUrl}" class="bd-placeholder-img card-img-top" style="object-fit: cover; height: 200px;" />
  <div class="card-body d-flex flex-column text-center">
    <h5 class="card-title">${product.name}</h5>
    <p class="card-text text-white">${product.description}</p>
    <p class="card-text text-white flex-grow-1">${product.brand}</p>
    <div class="btn-group-vertical">
      <button type="button" class="btn btn-sm btn-warning text-dark rounded mb-2" onclick="editProduct('${product._id}')">Modifica</button>
      <button type="button" class="btn btn-sm btn-warning text-dark rounded" onclick="deleteProduct('${product._id}')">Cancella</button>
    </div>
    <small class="text-white text-center mt-3">Prezzo: ${product.price}€/kg</small>
  </div>
</div>
`;

  // la card si aggiunge solo se la destinazione è la HOME

  const isHome =
    destination === "home" && window.location.pathname.includes("home.html");
  if (isHome) {
    const productListHome = document.getElementById("productListHome");
    if (productListHome) {
      productListHome.appendChild(card);
    } else {
      console.error(
        "Elemento productListHome non trovato nella pagina home :("
      );
    }
  }

  return card;
};

// funzione per la cancellazione di un prodotto

const deleteProduct = function (productId) {
  const isConfirmed = window.confirm(
    "Sei sicuro di voler cancellare questo prodotto?"
  );
  if (isConfirmed) {
    const deleteProductEndpoint = `https://striveschool-api.herokuapp.com/api/product/${productId}`;
    const authToken =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDY5ZjE4N2U1YzAwMTgxNGM2NGQiLCJpYXQiOjE3MDU2NTgwMTUsImV4cCI6MTcwNjg2NzYxNX0.NHXol6Wx9cTpBev6SuDU7tgwWauhLdcZQV9B3mTISuc";
    fetch(deleteProductEndpoint, {
      method: "DELETE",
      headers: {
        Authorization: authToken,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            `Errore nella cancellazione del prodotto: ${response.status} :()`
          );
        }
      })
      .then(() => {
        alert("Il prodotto è stato cancellato");
        fetchProducts();
      })
      .catch((error) => {
        console.error("Errore durante la cancellazione del prodotto:", error);
      });
  }
};

// funzione per la creazione di un nuovo prodotto

const createProduct = function () {
  const productName = document.getElementById("productNome").value;
  const productDescription =
    document.getElementById("productDescrizione").value;
  const productBrand = document.getElementById("productBrand").value;
  const productFoto = document.getElementById("productFoto").value;
  const productPrezzo = parseFloat(
    document.getElementById("productPrezzo").value
  );
  const createProductEndpoint =
    "https://striveschool-api.herokuapp.com/api/product/";
  const authToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDY5ZjE4N2U1YzAwMTgxNGM2NGQiLCJpYXQiOjE3MDU2NTgwMTUsImV4cCI6MTcwNjg2NzYxNX0.NHXol6Wx9cTpBev6SuDU7tgwWauhLdcZQV9B3mTISuc";
  fetch(createProductEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
    body: JSON.stringify({
      name: productName,
      description: productDescription,
      brand: productBrand,
      imageUrl: productFoto,
      price: productPrezzo,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          `Errore nella creazione del prodotto: ${response.status} :()`
        );
      }
    })
    .then(() => {
      alert("Prodotto creato con successo!");
      fetchProducts();
    })
    .catch((error) => {
      console.error("Errore durante la creazione del prodotto:", error);
    });
};
