
const wheatherform= document.querySelector(".wheatherform");
const iptcity =document.querySelector(".iptcity");
const card=document.querySelector(".card");
const apiKey ="01702aa9c93fc8aa179569781a5e1d48";


wheatherform.addEventListener("submit",async event=>{
   
    event.preventDefault();

    const city= iptcity.value;
    if(city){
         try{
            const wheatherdata =  await getWheatherdata(city);
            displayWheatherinfo(wheatherdata);
         }
         catch(error){
            console.log(error);
            displayError(error);
         }
    }
    else{
        displayError("Please Enter a City");
    }
});

async function getWheatherdata(city){
 const apiurl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
 const response = await fetch(apiurl);
      if(!response.ok){
         throw new Error("Could not fetch weather data")
      }

      return await response.json();
}

function displayWheatherinfo(data){
      console.log(data);
      const {name:city ,
             main: {temp,humidity},
             weather: [{description,id}]} =data;

     card.textContent="";
     card.style.display="flex";

     const citydisplay =document.createElement("h1");
     const tempdisplay =document.createElement("p");
     const humiditydisplay =document.createElement("p");
     const discdisplay =document.createElement("p");
     const weatheremoji =document.createElement("p");


     citydisplay.textContent=city;
     tempdisplay.textContent=`${(temp-273.5).toFixed(1)}°C`;
     humiditydisplay.textContent=`humidity : ${humidity}`;
     discdisplay.textContent=description;
     weatheremoji.textContent=wheatherEmoji(id)

     weatheremoji.classList.add("wheatheremoji");
     humiditydisplay.classList.add("humididtydisplay");
     tempdisplay.classList.add("tempdisplay");
     citydisplay.classList.add("citydisplay");
     discdisplay.classList.add("discdisplay");

     card.appendChild(citydisplay);
     card.appendChild(tempdisplay);
     card.appendChild(humiditydisplay);
     card.appendChild(discdisplay);
     card.appendChild(weatheremoji);
}

function wheatherEmoji(weatherId){
      
    switch(true){
        case(weatherId>=200 && weatherId<300):
           return  "⛈️";
        case(weatherId>=300 && weatherId<600):
           return  "🌧️";
        case(weatherId>=600 && weatherId<700):
           return  "❄️";
        case(weatherId>=700 && weatherId<800):
           return  "🌫️";
        case(weatherId===800):
           return  "☀️";
        case(weatherId>=801 && weatherId<810):
           return  "☁️";
        default:
            return "❓";
    }
}

function displayError(message){
   const errordisplay = document.createElement("p");
   errordisplay.textContent=message;
   errordisplay.classList.add("errordisplay");

   card.textContent="";
   card.style.display="flex";
   card.appendChild(errordisplay);

}