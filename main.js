const accessKey = "p2uvDqhY6mCcMsDTss-jqCjkwFaRjEDwEOdNZrAr1E4";

const forml = document.querySelector("form");
const inputEl = document.getElementById("search-item");
const searchResult = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImage(){
    inputData = inputEl.value;
    const url = `https:/api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url);
    const data = await response.json();

      const results = data.results;

      if(page === 1){
        searchResult.innerHTML = "";
      }

      results.map((result) =>{
         const imagewrapper = document.createElement('div');
         imagewrapper.classList.add("search-result");
         const image = document.createElement('img');
         image.src = result.urls.small;
         image.alt = result.alt_description;
         const imageLink = document.createElement('a');
         imageLink.href = result.links.html;
         imageLink.target = "_blank";
         imageLink.textContent = result.alt_description;


         imagewrapper.appendChild(image);
         imagewrapper.appendChild(imageLink);
         searchResult.appendChild(imagewrapper);
      });

      page ++;
      if(page > 1){
        showMore.style.display = "block";
    }
}

 forml.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImage();
 })

 showMore.addEventListener("click", () => {
    searchImage();
 })
