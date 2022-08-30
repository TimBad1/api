(function () {
  const APP = document.getElementById('app-blog');
  APP.classList.add('container', 'p-3');

  const baseDate = 'https://gorest.co.in/public-api/posts';

  let pages;
  let page = window.location.search.slice(6);

  let CARD_LIST = document.createElement('div');
  CARD_LIST.classList.add('row', 'g-4', 'mb-5');

  APP.append(CARD_LIST);

  // создание одной карточки
  function createCard(post) {
    let id = post.id;
    let title = post.title;
    let descr = post.body;
    let userId = post.user_id;

    let cardWrapper = document.createElement('div');
    cardWrapper.classList.add('col-sm-6')

    let card = document.createElement('div');
    card.classList.add('card', 'h-100');

    let body = document.createElement('div');
    body.classList.add('card-body', 'shadow')

    let cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = title;

    let cardDescr = document.createElement('p');
    cardDescr.classList.add('card-text', 'text-truncate');
    cardDescr.textContent = descr;

    let link = document.createElement('a');
    link.classList.add('btn', 'btn-primary');
    link.setAttribute('href', `post.html?id=${id}`);
    link.setAttribute('href', `post.html?id=${id}`);
    link.textContent = 'Подробнее';

    body.append(cardTitle, cardDescr, link);
    card.append(body);
    cardWrapper.append(card);
    CARD_LIST.append(cardWrapper)
    // return cardWrapper;
  }

  // получение данных и вызов функции создания карточек
  async function getData(url) {
    const response = await fetch(`${url}${window.location.search}`);
    const data = await response.json();

    page = data.meta.pagination.page;
    pages = data.meta.pagination.pages;
    createButtonGroup(page, pages)
    return data.data.forEach(card => createCard(card))
  }

  getData(baseDate)

  // функция создания одной кнопки
  function createButton(title, id, isDisabled = false) {
    const BUTTON = document.createElement('a');
    BUTTON.classList.add('btn', 'btn-outline-primary');
    BUTTON.setAttribute('href', `index.html?page=${id}`);
    BUTTON.setAttribute('id', id)
    BUTTON.setAttribute('role', 'button');
    BUTTON.textContent = title;

    if(isDisabled) {
      BUTTON.classList.add('disabled');
    }

    return BUTTON;
  }

  // функция создания группы кнопок
  function createButtonGroup(page, pages) {
    const BUTTON_GROUP = document.createElement('div');
    BUTTON_GROUP.classList.add('btn-group', 'd-block', 'text-center');
    BUTTON_GROUP.setAttribute('role', 'group');
    BUTTON_GROUP.setAttribute('aria-label', 'Кнопки переключения страниц');

    let arrButtons = [];

    // first button
    page === 1
      ? arrButtons.push(createButton('В начало', '1', true))
      : arrButtons.push(createButton('В начало', '1'));

    // before button
    if(page > 2) {
      arrButtons.push(createButton('...', page - 2));
    }

    // prev button
    if(page >= 2) {
      arrButtons.push(createButton(page - 1, page - 1));
    }

    // page button
    arrButtons.push(createButton(page, page, true));

    // next button
    if(page <= pages - 1) {
      arrButtons.push(createButton(page + 1, page + 1));
    }

    // after button
    if(page < pages - 1) {
      arrButtons.push(createButton('...', page + 2));
    }

    // last button
    page === pages
      ? arrButtons.push(createButton('В конец', pages, true))
      : arrButtons.push(createButton('В конец', pages));

    arrButtons.forEach(el => BUTTON_GROUP.append(el))
    APP.append(BUTTON_GROUP)
  }
})()
