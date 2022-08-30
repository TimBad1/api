(function() {
  const BODY = document.body;
  const baseDate = 'https://gorest.co.in/public-api/posts';

  function createCard(post) {
    let title = post.title;
    let descr = post.body;

    let card = document.createElement('div');
    card.classList.add('card', 'h-100');

    let body = document.createElement('div');
    body.classList.add('card-body')

    let cardTitle = document.createElement('h1');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = title;

    let cardDescr = document.createElement('p');
    cardDescr.classList.add('card-text');
    cardDescr.textContent = descr;

    body.append(cardTitle, cardDescr);
    card.append(body);
    BODY.append(card)
  }

  async function getData(url) {
    const response = await fetch(`${url}${window.location.search}`);
    const data = await response.json();

    return data.data.forEach(card => createCard(card))
  }

  getData(baseDate)
})()
