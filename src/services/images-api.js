export function fetchImages(page, query) {
  return fetch(
    `https://pixabay.com/api/?key=22509463-498a875afefc35fc9228c8f09&q=${query}&page=${page}&per_page=12&image_type=photo`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`No results`));
  });
}
