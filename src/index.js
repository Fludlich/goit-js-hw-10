import './css/styles.css';
console.log('defgrtbnh')
console.log('defgrtbnh')
const DEBOUNCE_DELAY = 300;

const input = document.getElementById("search-box");
console.log(input);
input.addEventListener("input", serchingResult);
let country = "";
function serchingResult(event) {
    country = event.target.value;
    arar();
}
function arar() {
    console.log(country);
    fetch(`https://restcountries.com/v2/name/${country}?fields=nativeName,capital,population,flag,languages`).then((response)=>response.json()).then((data1)=>data1.map((data)=>{
            console.log(data, 'ADF');
        }));
// .then(data)
}
