const apiKey = "muvKfoqMsfi-Tw_cahQFQh_HpE4rYTodZHr4uaD6jFEa1KPG";
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const newsFetch = document.querySelector(".news-fetch");

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchNews(query);
  } else {
    alert("please, enter your search item");
  }
});
async function fetchNews(query) {
  const url = `https://api.currentsapi.services/v1/search?apiKey=${apiKey}&keywords=${encodeURIComponent(
    query
  )}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.error("error fetching news", error);
    newsFetch.innerHTML = `<p>error fetching news:${error.message}</p>`;
  }
}
function displayResults(data) {
  if (data.news && data.news.length > 0) {
    data.news.forEach((article) => {
      const searchItem = document.createElement("div");
      searchItem.className = "search-item";
      searchItem.innerHTML = `<img src="${
        article.image ? article.image : "https://via.placeholder.com/300"
      }" alt="${article.title}">
                    <h3>${article.title}</h3>
                    <p>${article.description || "No description available."}</p>
                    <a href="${article.url}" target="_blank">Read more</a>`;
      newsFetch.appendChild(searchItem);
    });
  } else {
    newsFetch.innerHTML = `No articles found`;
  }
}
