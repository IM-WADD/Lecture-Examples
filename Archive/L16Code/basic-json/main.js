/**
 * Create an object to represent an animal
 * @param {string} name 
 * @param {number} age 
 */
function Animal(name, age) {
    this.name = name;
    this.age = age;
}

// This is a JavaScript object literal
const animals = {
    "cats": [ new Animal("Fluffy", 2), new Animal("Mittens", 7) ],
    "dogs": [ new Animal("Spot", 7)]
}

console.log("The animals JS object:");
console.log(animals);

console.log("animals converted to a JSON string:");
const animalsJSON = JSON.stringify(animals);
console.log(animalsJSON);

console.log("animalsJSON converted back to a JS object:");
const animals2 = JSON.parse(animalsJSON);
console.log(animals2);