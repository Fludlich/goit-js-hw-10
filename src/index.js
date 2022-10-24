import './css/styles.css';

let debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

const input = document.getElementById("search-box");

input.addEventListener("input", debounce(serchingResult, DEBOUNCE_DELAY));
let country = "";

function serchingResult(event) {
    if(input.value.trim().length===0) {
      return
    }
    country = event.target.value;
    arar();
   
}
function arar() {
    fetch(`https://restcountries.com/v2/name/${country.trim()}?fields=name,capital,population,flag,languages`)
    .then((response)=>response.json())
    .then(data=> dataLength(data))
    .catch(e=>{
        if(input.value.length>0){
            Notify.failure('Oops, there is no country with that name');
        }
        countryList.innerHTML = `<li></li>`
    })
  
}
function dataLength (data){
    countryInfo.innerHTML=`<p></p>`
    if(data.length>10){
        Notify.info('To many matches found.Please enter a more specific name');
        countryList.innerHTML = `<li></li>`
    }else if(data.length<=10 && data.length>=2) {
       const gal = data.map((data)=>`<li><img src=${data.flag} width='40' height='30'><p>${data.name}</p></li>`).join('')
       countryList.innerHTML = gal
    }else{
        data.map((data)=>countryList.innerHTML = `<li><img src=${data.flag} width='40'><p>${data.name}</p></li>`).join('')
        data.map((data)=>countryInfo.innerHTML = `<p><b>Capital:</b> ${data.capital}</p><p><b>Population:</b> ${data.population}</p><p><b>Languages:</b> ${data.languages.flatMap(el=>el.name)}</p>`).join('')
    }   
}