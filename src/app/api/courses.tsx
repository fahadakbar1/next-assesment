async function getData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const response = fetch("https://dummyjson.com/products/", options)
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}

export default async function courses() {
  const data = await getData();
  return data;
}
