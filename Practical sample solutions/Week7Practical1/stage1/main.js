// Exercise 1.1 - object literals
let address1 = {
    number: 9,
    street: 'Main Road',
    city: 'Townsborough',
    postcode: 'TO11 4HJ'
}

let address2 = {
    number: 36,
    street: 'Goose Street',
    city: 'Duckton',
    postcode: 'DK1 9TY'
}

let address3 = {
    number: 333,
    street: 'Business Avenue',
    city: 'York',
    postcode: 'YO99 1RD'
}

console.log(address1);
console.log(address2);
console.log(address3);

// accessing properties
console.log(address3.number, address3.street, address3.city, address3.postcode);

// Exercise 1.2 - object constructor function
function AddressObj(number, street, city, postcode) {
    this.number = number;
    this.street = street;
    this.city = city;
    this.postcode = postcode;
}

address1 = new AddressObj(9, 'Main Road', 'Townsborough', 'TO11 4HJ');
address2 = new AddressObj(36, 'Goose Street', 'Duckton', 'DK1 9TY');
address3 = new AddressObj(333, 'Business Avenue', 'York', 'YO99 1RD');

console.log(address1);
console.log(address2);
console.log(address3);

// accessing properties
console.log(address3.number, address3.street, address3.city, address3.postcode);