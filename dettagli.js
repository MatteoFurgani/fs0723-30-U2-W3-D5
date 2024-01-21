document.addEventListener("DOMContentLoaded", function () {
  const productId = new URLSearchParams(location.search).get("productId");

  if (productId) {
  } else {
    console.error("ID del prodotto non valido :(");
  }

  // funzione per recuperare il prodotto dall'API

  const fetchProductDetails = function (productId) {
    const productDetailsEndpoint = `https://striveschool-api.herokuapp.com/api/product/${productId}`;
    fetch(productDetailsEndpoint, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNDY5ZjE4N2U1YzAwMTgxNGM2NGQiLCJpYXQiOjE3MDU2NTgwMTUsImV4cCI6MTcwNjg2NzYxNX0.NHXol6Wx9cTpBev6SuDU7tgwWauhLdcZQV9B3mTISuc",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            `Errore nel recupero dei dettagli del prodotto: ${response.status}`
          );
        }
      })
      .then((productDetails) => {
        // chiamo la funzione per visualizzare il prodotto sulla pagina
        displayProductDetails(productDetails);
      })
      .catch((error) => {
        console.error(
          "Errore durante il recupero dei dettagli del prodotto :(",
          error
        );
      });
  };

  // funzione per visualizzare il prodotto sulla pagina DETTAGLI

  const displayProductDetails = function (productDetails) {
    const productDetailsContainer = document.getElementById("productDetails");

    productDetailsContainer.innerHTML = `
    <div class="container">
    <h2 class="mb-4 text-center text-warning">${productDetails.name}</h2>
    <div class="row row-cols-1 row-cols-lg-2">
        <div class="col-lg-12 d-flex justify-content-center align-items-center ">
            <img src="${productDetails.imageUrl}" class="img-fluid mb-3" style="max-width: 100%; max-height: 200px;" alt="${productDetails.name}">
        </div>
        <div class="col-lg-12 text-center">
            <div class="ms-3">
                <strong class="fs-3">Descrizione:</strong>
                <p class="mt-2 mb-4 fs-5 text-warning">${productDetails.description}</p>
                <strong class="fs-3">Brand:</strong>
                <p class="mt-2 mb-4 fs-5 text-warning">${productDetails.brand}</p>
                <strong class="fs-3">Prezzo:</strong>
                <p class="mt-2 mb-4 fs-5 text-warning">${productDetails.price}€</p>
            </div>
        </div>
    </div>
</div>`;
  };

  // chiamo la funzione per recuperare il prodotto

  fetchProductDetails(productId);
});
