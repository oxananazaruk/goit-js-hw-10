import SlimSelect from 'slim-select';
import { fetchBreeds } from "./cat-api.js";
import { makeMarkupforSelect } from "./cat-api.js";
import { fetchCatByBreed } from "./cat-api.js";
import {makeCatCardMarkup} from "./cat-api.js"

const BASE_URL = "https://api.thecatapi.com/v1/breeds";
const refs = {
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    selectEl: document.querySelector('.breed-select'),
};
refs.selectEl.hidden = true;
refs.error.hidden = true;

    fetchBreeds()
        .then(data => {
//         new SlimSelect({
//   select: '#selectElement'
//         })
            const markup = makeMarkupforSelect(data);
            refs.selectEl.innerHTML = markup;

            refs.loader.hidden = true;
            refs.selectEl.hidden = false;
        })
        .catch(error => {
            console.log(error);
            refs.error.hidden = false;
        });
    

refs.selectEl.addEventListener('change', onSelectHandler);

function onSelectHandler(event) {
    refs.loader.hidden = false;
    refs.error.hidden = true;
    const selectedBreedId = event.currentTarget.value;
    fetchCatByBreed(selectedBreedId)
        .then(result => {
            console.log(result.data);
            
            const name = result.data[0].breeds[0].name;
            const url = result.data[0].url;
            const temperament = result.data[0].breeds[0].temperament;
            const description = result.data[0].breeds[0].description;
            
            const catMarkup = makeCatCardMarkup(name, url, temperament, description);
            console.log(catMarkup);
            refs.catInfo.insertAdjacentHTML("beforeend", catMarkup);
            refs.loader.hidden = true;
        })
        .catch(error => {
            console.log(error);
            refs.loader.hidden = true;
            refs.error.hidden = false;
            refs.catInfo.innerHTML = "";
        });   
}