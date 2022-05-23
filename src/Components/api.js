export function getList() {
    return fetch('https://fakestoreapi.com/products/')
      .then(data => data.json())
  }

