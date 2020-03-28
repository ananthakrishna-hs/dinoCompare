const form = document.getElementById('dino-compare');

/**
 * @typedef {Object} DinoObject
 * @property {string} species
 * @property {number} weight
 * @property {number} height
 * @property {string} diet
 * @property {string} where
 * @property {string} fact
 * @property {string} when
 */
/**
 * @description Constructor to create Dino objects
 * @param {DinoObject} dinoObject - Dino information to create object
 */
function Dino(dinoObject) {
    this.type = 'Dino';
    this.name = dinoObject.species;
    this.weight = dinoObject.weight;
    this.height = dinoObject.height;
    this.diet = dinoObject.diet;
    this.location = dinoObject.where;
    this.fact = dinoObject.fact;
    this.image = `images/${dinoObject.species.toLowerCase()}.png`
}

/**
 * @description Function to create dino objects from the data obtained
 * @param {DinoObject[]} dinoData - Array of dino information data
 * @returns {Dino[]} Array of Dino objects
 */
const dinosCreate = (dinoData) => {
    let dinos = [];
    dinoData.forEach(dItem => {
        const d = new Dino(dItem);
        dinos.push(d);
    });
    return dinos;
}

/**
 * @description Constructor to create human object
 * @param {FormData} humanData 
 */
function Human(humanData) {
    this.type = 'Human'
    this.name = humanData.get('name');
    this.image = `images/human.png`;
    this.weight = humanData.get('weight');
    this.height = humanData.get('feet') * 12 + humanData.get('inches');
    this.diet = humanData.get('diet');
    this.location = humanData.get('location');
}

/**
 * @description Function to create infographic data
 * @param {DinoObject[]} dinoData - Array of dino information data
 */
const createData = (dinoData) => {
    const tiles = dinosCreate(dinoData);
    const human = (function() {
        return new Human(new FormData(form));
    })();
    tiles.splice(4, 0, human);
    console.log(tiles);
}

    // Use IIFE to get human data from form


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.

const compare = () => {
    fetch('dino.json')
        .then(response => response.json())
        .then(dinos => {
            createData(dinos.Dinos);
        });
    // form.remove();
}
    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
