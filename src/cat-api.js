import axios from "axios";
import SlimSelect from 'slim-select';
axios.defaults.headers.common["x-api-key"] = "live_4LFtrKZ60t1sSxyWQIMaxwmXv2zlodstUsaDoW06kaYtPaMPvYTC90vu15TR1WnN";

export function fetchBreeds() {
    return axios.get("https://api.thecatapi.com/v1/breeds")
        .then(response => {
            // console.log(response.data);
            return response.data;  
        })
       .catch(error => {
    console.log(error);
  });
       
};

export function makeMarkupforSelect(data) {
    return data.map(element => {
        return `<option value="${element.id}">${element.name}</option>`
    }).join("");
};

export function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(result => {
            return result;
        })
        .catch(error => {
            console.log(error);
        })
};

export function makeCatCardMarkup(name, url, temperament, description) {
    return `
    <img class="js-cat-img" src="${url}" alt="${name}" width="400"/>
    <div class="js-cat-wrapper>
    <h2>${name}</h2>
    <p>${temperament}</p>
    <p>${description}</p>
    </div>
   ` 
};