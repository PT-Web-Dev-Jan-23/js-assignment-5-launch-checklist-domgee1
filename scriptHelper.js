// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo (document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   
   let missionDestination = document.getElementById("missionTarget")
   missionDestination.innerHTML =
                `<h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons} </li>
                </ol>
                <img src="${imageUrl}">`
   

}

function validateInput(testInput) { 
   numberInput = Number(testInput);
   if ( testInput === "") {
    return "Empty"; 
   } else if (isNaN(numberInput)){
    return "Not a Number";
   } else if (!isNaN(numberInput) === false){
    return "Is a Number";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
  let pilotStatus = document.getElementById("pilotStatus");
  let cargoStatus = document.getElementById("cargoStatus");
  let copilotStatus = document.getElementById("copilotStatus");
  let fuelStatus = document.getElementById("fuelStatus");
  let launchStatus = document.getElementById("launchStatus")
    
  if (validateInput(pilot) === "Empty" || validateInput(copilot) == "Empty" || validateInput(fuelLevel) == "Empty" || validateInput(cargoLevel) == "Empty"){
    alert("All fields required!");
   return;

} else if (validateInput(pilot) === "Is a number" || validateInput(copilot) === "Is a number" || validateInput(fuelLevel) === "Not a number" || validateInput(cargoLevel) === "Not a Number") {
  alert("Make sure information is valid!")
  return;  

} else { 
list.style.visibility = "visible"
pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`


if (fuelLevel < 10000 && cargoLevel > 10000) {
    list.style.visibility = "visible"
    fuelStatus.innerHTML = "Fuel level too low for launch"
    cargoStatus.innerHTML = "Cargo mass too heavy for launch"
    launchStatus.innerHTML = "Shuttle not ready for launch"
    launchStatus.style.color = "red"
} else if (fuelLevel >= 10000 && cargoLevel > 10000) {
    list.style.visibility = "Visible"
    cargoStatus.innerHTML = "There is too much mass for the shuttle to take off."
    fuelStatus.innerHTML = "Fuel level high enough for launch"
    launchStatus.innerHTML = "Shuttle not ready for launch"
    launchStatus.style.color = "Red"
} else if (fuelLevel < 10000 && cargoLevel < 10000) {
    list.style.visibility = "visible"
    fuelStatus.innerHTML = "Fuel level too low for launch"
    cargoStatus.innerHTML = "Cargo mass is low enough for launch"
    launchStatus.innerHTML = "Shuttle not ready for launch"
    launchStatus.style.color = "red"
}

else {
    list.style.visibility = "Visible";
    fuelStatus.innerHTML= "Fuel levels are enough to launch"
    cargoStatus.innerHTML= "Mass is low enough to lauch"
    launchStatus.innerHTML= "Shuttle is ready  launch"
    launchStatus.style.color = "green"

    }
}
}


async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function (response) {
    return response.json();    
});
    return planetsReturned;
}

function pickPlanet(planets) {
    let randomPlanet = Math.floor(Math.random()*planets.length);
    return planets[randomPlanet] 
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
