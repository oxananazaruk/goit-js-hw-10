// import axios from "axios";
import SlimSelect from 'slim-select';
import { fetchBreeds } from "./cat-api.js";
import { makeMarkupforSelect } from "./cat-api.js";
import { fetchCatByBreed } from "./cat-api.js";
import {makeCatCardMarkup} from "./cat-api.js"

// axios.defaults.headers.common["x-api-key"] = "live_4LFtrKZ60t1sSxyWQIMaxwmXv2zlodstUsaDoW06kaYtPaMPvYTC90vu15TR1WnN";

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
    const selectedBreedId = event.currentTarget.value;
    fetchCatByBreed(selectedBreedId)
        .then(result => {
            console.log(result.data);
            
            const catName = result.data[0].breeds[0].name;
            const catUrl = result.data[0].url;
            const catTemperament = result.data[0].breeds[0].temperament;
            const catDescription = result.data[0].breeds[0].description;
            
            const catMarkup = makeCatCardMarkup(catName, catUrl, catTemperament, catDescription);
            console.log(catMarkup);
            refs.catInfo.innerHTML = catMarkup;
            refs.loader.hidden = true;
        })
        .catch(error = {
            // console.log(error);
            // refs.error.hidden = false;
        });   
}