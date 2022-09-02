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
    console.log(data.data);
}

loadCategory();

