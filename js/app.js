
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// key: "c25ce42d5a63db440211b35c5c1dd880"

const weatherApi ={
    key: "c25ce42d5a63db440211b35c5c1dd880",
    baseUrl: "api.openweathermap.org/data/2.5/weather?"
}






// Event listener function on keypress

const searchInputBox = document.getElementById('search');

searchInputBox.addEventListener('keypress', (event)=>{
    if(event.keyCode == 13){
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        
    }
})

function curLocWeather(){
    let long;
    let lat;
    if(navigator.geolocation){
        
        navigator.geolocation.getCurrentPosition((position)=>{
            long=position.coords.longitude;
            lat=position.coords.latitude;
            const proxy= "https://cors-anywhere.herokuapp.com/";

            const api=`${proxy}${weatherApi.baseUrl}lat=${lat}&lon=${long}&appid=${weatherApi.key}&units=metric`

            fetch(api).then((weather)=>{
                return weather.json();
            })

            .then (showWeatherReport);
        })

    }
}







// Get weather report
function getWeatherReport(city){
    fetch(`https://${weatherApi.baseUrl}q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

// location

window.addEventListener("load",()=>{
    let long;
    let lat;
    if(navigator.geolocation){
        
        navigator.geolocation.getCurrentPosition((position)=>{
            long=position.coords.longitude;
            lat=position.coords.latitude;
            const proxy= "https://cors-anywhere.herokuapp.com/";

            const api=`${proxy}${weatherApi.baseUrl}lat=${lat}&lon=${long}&appid=${weatherApi.key}&units=metric`

            fetch(api).then((weather)=>{
                return weather.json();
            })

            .then (showWeatherReport);
        })

    }
})


// show weather report
function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerText = `${Math.round(weather.main.temp)}`;

    let minmaxTemp = document.getElementById('minMax');
    minmaxTemp.innerHTML = `Max ${Math.ceil(weather.main.temp_max)}&deg;C / Min ${Math.floor(weather.main.temp_min)}&deg;C`;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let feelLikeTemp = document.getElementById('feel');
    feelLikeTemp.innerHTML = `${Math.round(weather.main.feels_like)}&deg;C `;

    let humid = document.getElementById('humidity');
    humid.innerText = `${Math.round(weather.main.humidity)}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent == 'Haze'){
        document.body.style.backgroundColor = "var(--haze-color)";
    }
    else if(weatherType.textContent == 'Clouds'){
        document.body.style.backgroundColor = "var(--clouds-color)";
    }
    else if(weatherType.textContent == 'Clear'){
        document.body.style.backgroundColor = "var(--clear-color)";
    }
    else if(weatherType.textContent == 'Mist'){
        document.body.style.backgroundColor = "var(--mist-color)";
    }

    let weatherIcon = document.getElementById('w-icon');
    
    if(weather.weather[0].id<300 && weather.weather[0].id>=200){
        weatherIcon.src="./images/thunderstorm.png";
    }
    else if(weather.weather[0].id<400 && weather.weather[0].id>=300){
        weatherIcon.src="./images/drizzle.png";
    }
    else if(weather.weather[0].id<550 && weather.weather[0].id>=500){
        weatherIcon.src="./images/rain.png";
    }
    else if(weather.weather[0].id<700 && weather.weather[0].id>=600){
        weatherIcon.src="./images/snow.png";
    }
    else if(weather.weather[0].id<750 && weather.weather[0].id>700){
        weatherIcon.src="./images/fog.png";
    }
    else if(weather.weather[0].id==800){
        weatherIcon.src="./images/clear-sky.png";
    }
    else if(weather.weather[0].id>800){
        weatherIcon.src="./images/clouds.png";
    }


}


// date manager

function dateManage(dateArg) {
    let days = ["SUnday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} ${year} | ${day}`;
}


