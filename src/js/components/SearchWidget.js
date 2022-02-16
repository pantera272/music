import { className, select, templates } from '../settings.js';
import utils from '../utils.js';
import Song from './Song.js';

class SearchWidget{
  constructor(data){
    const thisWidget = this;

    thisWidget.data = data;
    thisWidget.dom = {};

    thisWidget.getElements();
    thisWidget.initAction();
    thisWidget.clearInfo();
    thisWidget.categoryView();
  }


  getElements(){
    const thisWidget = this;

    thisWidget.dom.searchInput = document.querySelector(select.form.input);
    thisWidget.dom.searchButton = document.querySelector(select.form.button);
    thisWidget.dom.found = document.querySelector(select.form.found);
    thisWidget.dom.info = document.querySelectorAll(select.form.info);
    thisWidget.dom.select = document.querySelector(select.form.option);
  }

  initAction(){
    const thisWidget = this;
  
    thisWidget.dom.searchButton.addEventListener('click', function(event){
      event.preventDefault();
      utils.clearMusicContainer();
      thisWidget.clearInfo(); 
      thisWidget.initSearch(thisWidget.dom.searchInput.value, thisWidget.dom.select.value);
      thisWidget.dom.searchInput.value = '';
    });
  }

  clearInfo(){
    const thisWidget = this;
    
    for(let info of thisWidget.dom.info){
      info.classList.add(className.form.visible);
    }
  }

  initSearch(search, category){
    const thisWidget = this;
    let find = 0;
    
    for(let song in thisWidget.data.songs){
      let filename = thisWidget.data.songs[song].filename;
      filename = utils.createTextFromFilename(filename); 
      const regEx = new RegExp(search,'ig');
      const isFind = filename.search(regEx, search); 
        
      if(isFind >= 0){  
        const categoryArray = thisWidget.data.songs[song].categories;

        if (category == ''){
          find++;
          new Song(thisWidget.data.songs[song]);
        } else {
          const isCategory = categoryArray.indexOf(category);
          if (isCategory != -1){
            find++;
            new Song(thisWidget.data.songs[song]);
          }
        }       
      }
    }

    thisWidget.dom.found.innerHTML = find;
    thisWidget.dom.info[0].classList.remove(className.form.visible);
    utils.initGap();

  } 
  
  categoryView(){
    const thisWidget = this;
    const catObj = {};
    catObj.category = [];
    

    for(let song in thisWidget.data.songs){
      for(let catId in thisWidget.data.songs[song].categories){
        if (catObj.category.indexOf(thisWidget.data.songs[song].categories[catId]) == -1){
          catObj.category.push(thisWidget.data.songs[song].categories[catId]);
        }
      }
    } 
    
    
    const generatedHTML = templates.select(catObj);
    const option = document.querySelector(select.containerOf.selectForm);
    option.innerHTML = generatedHTML;
    
  }
}

export default SearchWidget;