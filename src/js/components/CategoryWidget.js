import { templates, select, className } from '../settings.js';
import utils from '../utils.js';
import Song from './Song.js';

class CategoryWidget {
  constructor(data) {
    const thisCategory = this;

    thisCategory.data = data;

    thisCategory.dom = {};
    thisCategory.uniqeCategory = {};
    thisCategory.uniqeCategory.category = [];

    thisCategory.initCategory();
    thisCategory.initAction();
    
  }
  initCategory(){
    const thisCategory = this;
    
    for(let category in thisCategory.data){
      for(let oneCategory in thisCategory.data[category].categories){
        const addCategory = thisCategory.data[category].categories[oneCategory];
        
        if(thisCategory.uniqeCategory.category == ''){
          thisCategory.uniqeCategory.category.push(addCategory);
        } else if (thisCategory.uniqeCategory.category.indexOf(addCategory) == -1){
          thisCategory.uniqeCategory.category.push(addCategory);
        }        
      }    
    }
    thisCategory.initView();
  }

  initView(){
    const thisCategory = this;

    const generatedHtml = templates.category(thisCategory.uniqeCategory);
    thisCategory.element = utils.createDOMFromHTML(generatedHtml);

    const container = document.querySelector(select.containerOf.category);
    container.appendChild(thisCategory.element);

    thisCategory.removePoint();
  }
  initAction(){
    // eslint-disable-next-line no-unused-vars
    const thisCategory = this;

    const categories = document.querySelector(select.nav.category);
    
    categories.addEventListener('click', function(event){
      event.preventDefault();
      
      let click = event.target;
      const style = click.classList.contains(className.nav.activeCategory);

      const dataTag = click.getAttribute(select.attribute.data);

      if (dataTag != null){
        if (!style){
          const links = document.querySelectorAll(select.nav.categoryLink);

          for (let link of links){
            link.classList.remove(className.nav.activeCategory);
          }

          click.classList.add(className.nav.activeCategory);

          utils.clearMusicContainer();
          thisCategory.filterSong(dataTag);
        } else {
          click.classList.remove(className.nav.activeCategory);
          utils.clearMusicContainer();
          thisCategory.filterSong();
        }
      }
      
    });
  }

  filterSong(categorySelect){
    const thisCategory = this;

    utils.clearMusicContainer();

    if (categorySelect != undefined){
      for (let song in thisCategory.data){
        for (let catId in thisCategory.data[song].categories){
          const category = thisCategory.data[song].categories[catId];
          if (category == categorySelect){
            new Song(thisCategory.data[song]);
          }  
        }  
      }
    } else {
      for(let song in thisCategory.data){
        new Song(thisCategory.data[song]);
      } 
    } 

    utils.initGap();
  }

  removePoint(){
    const point = document.querySelector(select.text.point);
    let text = point.innerHTML;
    text = text.replace(',','');
    point.innerHTML = text;
  }
}

export default CategoryWidget;