const dataObj = {
    cats: [ 
        {
            name: "Fluffy", 
            age: 2
        }, 
        {
            name: "Mittens", 
            age: 7
        } 
    ],
    dogs: [ 
        {
            name: "Spot", 
            age: 7
        } 
    ]
}

console.log("The data as an object literal:");
console.log(dataObj);

console.log("The data converted to a JSON string:");
const dataJSON = JSON.stringify(dataObj);
console.log(dataJSON);

console.log("The JSON data converted back to a JS object:");
const animals = JSON.parse(dataJSON);
console.log(animals);