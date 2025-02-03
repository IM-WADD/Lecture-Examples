class Character {
    name;
    age;
    type;

    constructor(name, age, type) {
        this.name = name;
        this.age = age;
        this.type = type;
    }
}

const characters = [
    new Character("Gandalf", 24000, "Wizard"),
    new Character("Aragorn", 87, "Human"),
    new Character("Galadriel", 8000, "Elf"),
    new Character("Frodo", 50, "Hobbit"),
    new Character("Samwise", 38, "Hobbit")
];

console.log("BEFORE:")
console.log(characters);

characters.sort((a, b) => b.age - a.age);

console.log("SORTED:");
console.log(characters);

const result = characters.filter(character => character.type !== "Hobbit")
                         .map(character => character.age)
                         .reduce((min, age) => age < min ? age : min);
console.log("The age of the youngest non-Hobbit is", result);