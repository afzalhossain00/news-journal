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

const displayCategory = categorys => {
    const allCategories = document.getElementById('all-category');
    categorys.forEach(category => {
        // console.log(category);
        const categoryItem = document.createElement('div');
        categoryItem.classList.add('col');
        categoryItem.innerHTML = `
        <button onclick="categoryId('${category.category_id}')" type="button" class="btn btn-light">${category.category_name}</button>
        `
        allCategories.appendChild(categoryItem);
    })
}

const categoryId = async (id) => {
    loading(true);
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await response.json();
    displayCategoryNews(data.data);
}
const displayCategoryNews = allnews => {
    const allNewsDetail = document.getElementById('all-news-detail')
    loading(false);
    allNewsDetail.innerHTML = '';
    allnews.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('card')
        newsItem.classList.add('mb-3')
        newsItem.innerHTML = `
        <div class="row g-0">
            <div class="col-md-3">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-9">
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
                    <button onclick="loadNewsDetail('${news}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">
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

const loadNewsDetail = async (newsId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${newsId}`);
    const data = await response.json();
    displayNewsDetails(data.data);
}

const displayNewsDetails = newsDetails => {
    console.log(newsDetails)
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

