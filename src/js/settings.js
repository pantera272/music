export const select = {
  templateOf: {
    player: '#template-player',
    category : '#template-category',
    select : '#template-select',
  },
  containerOf: {
    pages: '.navigation ol',
    music: '.music',
    category: '.categories',
    selectForm: '#category',
  },
  nav: {
    links: '.navigation a',
    category : '.categories',
    categoryLink : '.categories a',
  },
  pages: {
    section: 'section',
    subscribe: '.subscribe',
  },
  form: {
    input: 'input',
    button: '.search button',
    info: '.found h2',
    option: 'select',
    found: '.found span',
  },
  attribute:{
    data: 'data-tag', 
  },
  text: {
    point: '.categories li:last-child',
  },
  player: {
    playIcon: 'play-pause-btn__icon',
    player: '.player',
    playBtn : '.play-pause-btn',
    aria: 'aria-label',
    category: '.category',
  }
};

export const className = {
  pages: {
    active: 'disable-view',
  },
  nav: {
    active: 'active-link',
    activeCategory : 'active-category',
  },
  form: {
    visible: 'visible',
  }  
};

export const settings = {
  pages: {
    startPage: 'home',
  },
  db: {
    url: '//localhost:3131',
    songs: 'songs',
  }
};

export const templates = {
  player : Handlebars.compile(document.querySelector(select.templateOf.player).innerHTML),
  category : Handlebars.compile(document.querySelector(select.templateOf.category).innerHTML),
  select : Handlebars.compile(document.querySelector(select.templateOf.select).innerHTML),
};

