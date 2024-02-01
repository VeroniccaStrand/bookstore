const wordArray = [
  'book',
  'author',
  'novel',
  'library',
  'reading',
  'literature',
  'story',
  'adventure',
  'fantasy',
  'science',
  'mystery',
  'history',
  'romance',
  'poetry',
  'classic',
  'fiction',
  'nonfiction',
  'bestseller',
  'plot',
];

const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  return wordArray[randomIndex];
};
const fetchAndRenderProducts = async () => {
  const bookContainer = document.getElementById('book-container');

  try {
    const response = await fetch('http://localhost:3000/api/products');

    if (!response.ok) {
      throw new Error('Network response error');
    }

    const products = await response.json();

    products.forEach((product) => {
      const prodDiv = document.createElement('div');
      const picture = document.createElement('img');
      const wrap = document.createElement('div');
      prodDiv.innerHTML = `
      <h3 class='book__title'>${product.title}</h3>
        <p class='author__name' >${product.author.name}</p>
        <p class='desc__text'> ${product.desc}</p>`;

      const searchTerm = getRandomWord();
      const unsplashLink = 'https://source.unsplash.com/random';
      picture.src = `${unsplashLink}/300x300/?${searchTerm}`;
      prodDiv.classList.add('product');
      wrap.classList.add('wrap');
      wrap.append(picture, prodDiv);
      bookContainer.appendChild(wrap);
    });

    console.log(products);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
document.addEventListener('DOMContentLoaded', function () {
  fetchAndRenderProducts();
});
