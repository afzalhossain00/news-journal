//Fetch Category Data From API
const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}

const displayCategory = categorys => {
    const allCategories = document.getElementById('all-category');
    categorys.forEach(category => {
        // console.log(category);
        const categoryItem = document.createElement('div');
        categoryItem.classList.add('col');
        categoryItem.innerHTML = `
        <div onclick="categoryId('${category.category_id}')">${category.category_name}</div>
        `
        allCategories.appendChild(categoryItem);
    })
}

const categoryId = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await response.json();
    displayCategoryNews(data.data);
}
const displayCategoryNews = allnews => {
    const allNewsDetail = document.getElementById('all-news-detail')
    allNewsDetail.innerHTML = '';
    allnews.forEach(news => {
        console.log(news)
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
                    <p class="card-text">${news.details}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
        </div>    
        `
        allNewsDetail.appendChild(newsItem);
    })
}

loadCategory();

