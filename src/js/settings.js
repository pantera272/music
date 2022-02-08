export const select = {
  templateOf: {
    player: '#template-player',
  },
  containerOf: {
    pages: '.navigation ol',
    music: '.music',
  },
  nav: {
    links: '.navigation a',
  },
  pages: {
    section: 'section',
    subscribe: '.subscribe',
  },
  form: {
    input: 'input',
    button: '.search-form button',
    info: '.found h2',
    found: '.found span',
  }
};

export const className = {
  pages: {
    active: 'disable-view',
  },
  nav: {
    active: 'active-link',
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
};
