//constants
const key = "5c1d12e38eae18d3ab142ef3a2751417";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
const addCity = document.getElementById(`addCity`);
const addBtn = document.getElementById(`addBtn`);
const main = document.getElementById(`main`);
const arr = ["delhi", "mumbai", "kolkata"];
arr.sort();
let matchStatus = false;

//functions

// function compareByTemp(a, b){
//     if (a.temp < b.temp) {
//         return -1;
//     }
//     if (a.temp > b.temp) {
//         return 1;
//     }
//     return 0;
// }

arr.forEach(function(value){
    getCityWeather(value);
});

addBtn.addEventListener('click', () => {
    if(addCity.value === "" || addCity.value === " "){
        return;
    }
    addCity.value = addCity.value.trim();
    addInputToArr(addCity.value);
})

function addInputToArr(city){
    for (const item of arr) {
        if(item == city){
            matchStatus = true;
        }
    }
    if(matchStatus == true){
        alert("City Name Already Exist In Below Data");
        addCity.value = "";
        matchStatus = false;
        return;
    }else{
        arr.push(city);
        arr.sort();
        main.innerHTML = "";
        arr.forEach(function(value){
            getCityWeather(value);
        });
    }
}

async function getCityWeather(cityName){
    try{
        let url = `${baseURL}&q=${cityName}&appid=${key}&units=metric`;
        const response = await fetch(url, {method : "GET"});
        const result = await response.json();
        console.log(result);
        addCityWeather(result);
    }
    catch(error){
        alert("Something Went Wrong | Please Enter Correct City Name");
    }
}

function addCityWeather(city){
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.innerHTML = `
            <div class="weather-condition-image"><img src="images/shower.png" alt="fast winds image"></div>
            <div class="temp">${Math.round(city.main.temp)}°</div>
            <div class="cityname">
                <span>H : ${Math.round(city.main.temp_max)}° &nbsp L : ${Math.round(city.main.temp_min)}°</span>
                ${city.name}, ${city.sys.country}
            </div>
            <p class="weather-condition">${city.weather[0].main}</p>`;
    main.appendChild(cardElement);
    addCity.value = "";
}