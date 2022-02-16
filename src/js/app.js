// eslint-disable-next-line no-unused-vars
import Song from './components/Song.js';
import SearchWidget from './components/SearchWidget.js';
import { select, className, settings } from './settings.js';
import utils from './utils.js';
import CategoryWidget from './components/CategoryWidget.js';

const app = {
  initPage: function(){
    const thisApp = this;
    
    const navLinks = document.querySelectorAll(select.nav.links);
    // eslint-disable-next-line no-unused-vars
    let pageHash = window.location.hash;
    thisApp.possiblePages = [];
    let page = '';
    
    for(let navLink of navLinks){
      navLink.addEventListener('click', function(event){
        event.preventDefault();
        utils.clearMusicContainer();
        page = this.getAttribute('href');
        thisApp.activatePage(page);

      });
      let ad = navLink.getAttribute('href');
      thisApp.possiblePages.push(ad);
    }

    const wrongPages = thisApp.possiblePages.indexOf(pageHash);
    const pageHome = '#' + settings.pages.startPage;
    if (pageHash == '' || wrongPages == -1){
      thisApp.activatePage(pageHome);
    } else if (pageHash == pageHome) {
      thisApp.activatePage(pageHome);
    }
  },
  
  initSongs(){
    const thisApp = this;

    for(let song in thisApp.data.songs){
      new Song(thisApp.data.songs[song]);
    }
    utils.initGap(); 
  },

  initSearch(){
    const thisApp = this;
    new SearchWidget(thisApp.data);
  },

  activatePage: function(pageId){
    const thisApp = this;

    for(let navLink of thisApp.possiblePages){
      navLink = navLink.replace('#','.');
      const pages = document.querySelector(select.pages.section + navLink);
      if(!pages.classList.contains(className.pages.active)){
        pages.classList.add(className.pages.active);
      }  
    }

    window.location.hash = pageId;

    const links = document.querySelectorAll(select.nav.links);
    for(let link of links){
      link.classList.remove(className.nav.active);
      const hash = link.getAttribute('href');
      if(hash == pageId){
        link.classList.add(className.nav.active);
      }
    }

    const subscribe = document.querySelector(select.pages.subscribe);

    if(pageId == '#home'){
      thisApp.initSongs();
      subscribe.classList.remove(className.pages.active);
    } else if (pageId == '#discovery'){
      thisApp.randomSong();
      subscribe.classList.add(className.pages.active);
    } else if (pageId == '#search'){
      subscribe.classList.add(className.pages.active);
      const infos = document.querySelectorAll(select.form.info);
      for(let info of infos){
        if(!info.classList.contains(className.form.visible)){
          info.classList.add(className.form.visible);
        }
      }
    }

    pageId = pageId.replace('#','.');

    const active = document.querySelector(select.pages.section + pageId);
    active.classList.remove(className.pages.active);  
  },

  initData: function(){
    const thisApp = this;

    const connectDb = settings.db.url + '/' + settings.db.songs;
    thisApp.data = {};

    fetch(connectDb)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parseResponse){
        thisApp.data.songs = parseResponse;
        thisApp.initSongs(); 
        new CategoryWidget(thisApp.data.songs);
        thisApp.initSearch(); 
        thisApp.initDiscovery();
      });
  },

  randomSong(){
    const thisApp = this;
    if (thisApp.catDiscoveryValue == ''){
      const songsNumber = thisApp.data.songs.length;
      const random = Math.floor(Math.random() * songsNumber);
      new Song(thisApp.data.songs[random]);
      utils.initGap();
    } else {
      let maxNumber = 0;
      for(let number of thisApp.catDiscoveryValue){
        if(maxNumber < number){
          maxNumber = number;
        }
      }
      // eslint-disable-next-line no-unused-vars
      let cat = thisApp.catDiscoveryValue.indexOf(maxNumber);
      cat = thisApp.catDiscovery[cat];
      let data = [];

      for(let song in thisApp.data.songs){
        for(let category in thisApp.data.songs[song].categories){
          const match = thisApp.data.songs[song].categories[category].indexOf(cat);

          if (match != -1){
            data.push(song);
          }
        }    
      }

      const random = Math.floor(Math.random()*data.length);
      new Song(thisApp.data.songs[data[random]]);
      utils.initGap();
    } 
  },

  initDiscovery(){
    // eslint-disable-next-line no-unused-vars
    const thisApp = this;
    thisApp.catDiscovery = [];
    thisApp.catDiscoveryValue = [];

    const playButtons = document.querySelectorAll(select.containerOf.music);
    
    for(let playButton of playButtons){
      playButton.addEventListener('click',function(event){
        const file = event.target;
        const classBtn = file.classList.contains(select.player.playIcon);
        if (classBtn){
          const player = file.closest(select.player.player);
          
          let isPlay = player.querySelector(select.player.playBtn);
          isPlay = isPlay.getAttribute(select.player.aria);

          if(isPlay == 'Pause'){
            let description = player.querySelector(select.player.category);
            description = description.innerHTML;
            description = description.replace('Categories: ','');
            description = description.split(', ');
            for(let des of description){
              const isCategory = thisApp.catDiscovery.indexOf(des);
              if(isCategory == -1){
                thisApp.catDiscovery.push(des);
                thisApp.catDiscoveryValue.push(1);
              } else {
                thisApp.catDiscoveryValue[isCategory]++;
              }
            }
          } 
        }
      });
    }
    
  },

  init: function(){
    const thisApp = this;
    
    thisApp.initData();
    thisApp.initPage();
     
  }
};

app.init();