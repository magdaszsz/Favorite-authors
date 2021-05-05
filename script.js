
const app = {
  init() {
    const submitBtn = document.querySelector('button');
    submitBtn.addEventListener('click', function(e) {
      e.preventDefault();
      app.saveAuthor();
    })
    app.loadAuthors();
  },
  
  saveAuthor() {
    const author = document.getElementById('author').value.trim('');
    const title = document.getElementById('title').value.trim('');
    if(author && title) {
      const key = author.toLowerCase();
      const storage = localStorage.getItem(key);
      let titles = [];
      if(storage){
        titles = JSON.parse(storage)
      }
      titles.push(title);
      titles = Array.from(new Set(titles))
      localStorage.setItem(key, JSON.stringify(titles))
    } 
    document.getElementById('form').reset();
    this.loadAuthors();
  },

  loadAuthors() {
    let storageKeys = [];

    for (let i = 0; i < localStorage.length; i++) {
      storageKeys.push(localStorage.key(i));
    }

    const authorsHTML = storageKeys.map(item => {
      const detailElement = document.createElement('div');
      const titles = JSON.parse(localStorage.getItem(item));
      
      const titlesHTML = titles.map(title => {
        return `<p>${title}</p>`
      }).join('');
      return detailElement.innerHTML = `<details><summary>${item}</summary>${titlesHTML}</details>`;
    }).join('')

    document.getElementById('authors-div').innerHTML = authorsHTML;

  }

}

window.addEventListener("DOMContentLoaded", app.init);