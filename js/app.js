//Fetch Category Data From API
const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategory(data.data.news_category);
    }
    catch {
        console.log(error);
    }
}

// display category items
const displayCategory = categorys => {
    const allCategories = document.getElementById('all-category');
    categorys.forEach(category => {
        const categoryItem = document.createElement('div');
        categoryItem.classList.add('col');
        categoryItem.innerHTML = `
        <button onclick="categoryId('${category.category_id}' , '${category.category_name}')")" type="button" class="btn btn-light">${category.category_name}</button>
        `
        allCategories.appendChild(categoryItem);
    })
}

// load unique category data
const categoryId = async (id, newsItem) => {
    loading(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayCategoryNews(data.data, newsItem);
    }
    catch {
        console.log(error);
    }
}

// display all news for category item
const displayCategoryNews = (allnews, newsItem) => {
    const allNewsDetail = document.getElementById('all-news-detail')
    loading(false);
    allNewsDetail.textContent = '';
    const quantityNews = document.getElementById('news-quantity');
    quantityNews.value = allnews.length;
    quantityNews.innerHTML = `
        <p class="fw-bold pt-3 px-2">${quantityNews.value} items found for the category of ${newsItem ? newsItem : 'All News'}</p>
    `;

    // No News Found
    const noNews = document.getElementById('no-news-found');
    if (allnews.length === 0) {
        noNews.classList.remove('d-none');
    }
    else {
        noNews.classList.add('d-none');
    }

    // data sorting and shows most view news at top
    allnews.sort((a, b) => {
        return b.total_view - a.total_view;
    });

    allnews.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('card')
        newsItem.classList.add('mb-3')
        newsItem.innerHTML = `
        <div class="row g-0">
            <div class="col-md-3">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start h-100 w-100 p-2" alt="...">
            </div>
            <div class="col-md-9 pt-5">
                <div class="card-body">
                    <h5 class="card-title mb-4">${news.title}</h5>
                    <p class="card-text">${news.details.slice(0, 300) + '...'}</p>
                </div>
                <div class="d-flex justify-content-evenly py-5">
                  <div class="d-flex">
                   <img id="author-img" src="${news.author.img}"alt="...">
                   <p class="mx-2 fw-bold">${news.author.name ? news.author.name : 'No data found'}</p>
                   </div>
                  <div class="d-flex">
                    <p class="me-2"><i class="fa-regular fa-eye"></i></p>
                    <p class="fw-bold">${news.total_view ? news.total_view : 'No data found'}</p>
                  </div>
                    <div class= "text-primary fs-4 text border border-0" >
                    <button onclick="loadNewsDetail('${news._id}')" type="button" class="btn btn-primary fw-bold" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">Details 
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
                  </div>
             </div>
            </div>
        </div>    
          `
        allNewsDetail.appendChild(newsItem);
    })
}

// load single news details data
const loadNewsDetail = async (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNewsDetails(data.data);
    }
    catch {
        console.log(error);
    }
}

// display modal details
const displayNewsDetails = newsDetails => {
    const modalTitle = document.getElementById('newsDetailsModalLabel');
    newsDetails.forEach(element => {
        modalTitle.innerText = element.title;
        const newsesDetails = document.getElementById('news-details');
        newsesDetails.innerHTML = `
        <div 
            class="d-flex mb-4 p-2"><img id="author-img" src="${element.author.img}"alt="...">
            <p class="mx-2 fw-bold">${element.author.name ? element.author.name : 'No data found'}</p>
            <p class="mx-2 ">Publish Date: ${element.author.published_date ? element.author.published_date : 'No data found'}</p>
        </div>
             <img class="mb-4 img-fluid" src="${element.image_url
                ? element.image_url : 'No Image found'}">
        <p>Details: ${element.details ? element.details : 'No data'}</p>  
        <p class="mx-2 fw-semibold">Total View Count: ${element.total_view ? element.total_view : 'No data found'}</p>
    `;
    });
}

//Spinner or Loading Function
const loading = (isLoading) => {
    const loadingDiv = document.getElementById('loading-div');
    if (isLoading === true) {
        loadingDiv.classList.remove('d-none');

    }
    else {
        loadingDiv.classList.add('d-none');
    }
}

categoryId('08');

loadCategory();

