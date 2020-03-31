const button = document.getElementById('btn');
const form = document.getElementById('dino-compare');
const grid = document.getElementById('grid');

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
function Dino (dinoObject) {
  this.type = 'DINO';
  this.name = dinoObject.species;
  this.weight = dinoObject.weight;
  this.height = dinoObject.height;
  this.diet = dinoObject.diet;
  this.location = dinoObject.where;
  this.period = dinoObject.when;
  this.fact = dinoObject.fact;
  this.image = `images/${dinoObject.species.toLowerCase()}.png`;
}

/**
 * @description Function to create dino objects from the data obtained
 * @param {DinoObject[]} dinoData - Array of dino information data
 * @returns {Dino[]} Array of Dino objects
 */
const dinosCreate = (dinoData) => {
  const dinos = [];
  dinoData.forEach(dItem => {
    const d = new Dino(dItem);
    dinos.push(d);
  });
  return dinos;
};

/**
 * @description Constructor to create human object
 * @param {FormData} humanData - Data obtained from form
 */
function Human (humanData) {
  this.type = 'HUMAN';
  this.name = humanData.get('name');
  this.image = 'images/human.png';
  this.weight = Number(humanData.get('weight'));
  this.height = Number(humanData.get('feet')) * 12 + Number(humanData.get('inches'));
  this.diet = humanData.get('diet');
  this.location = humanData.get('location');
}

/**
 * @description Constructor to create tile object to be displayed
 * @param {string} name - Name for the tile
 * @param {string} image - Image url to be displayed
 * @param {string} fact - Fact generated
 */
function Tile (name, image, fact) {
  this.name = name;
  this.image = image;
  this.fact = fact;
}

/**
 * @description Function to compare weight of dino and human
 * @param {number} dinoWeight - Weight of dino in lbs
 * @param {number} humanWeight - Weight of human in lbs
 * @returns {string} Weight compared fact
 */
const weightComparator = (dinoWeight, humanWeight) => {
  const diff = dinoWeight - humanWeight;
  if (diff > 0) {
    return `It weighs ${diff}lbs more than you`;
  } else if (diff < 0) {
    return `It weighs ${diff}lbs less than you`;
  } else {
    return 'You both weigh the same';
  }
};

/**
 * @description Function to compare height of dino and human
 * @param {number} dinoHeight - Height of dino in inches
 * @param {number} humanHeight - Height of human in inches
 * @returns {string} Height compared fact
 */
const heightComparator = (dinoHeight, humanHeight) => {
  const diff = dinoHeight - humanHeight;
  if (diff > 0) {
    return `It is ${diff}inches taller more than you`;
  } else if (diff < 0) {
    return `It is ${diff}inches shorter than you`;
  } else {
    return 'You both are of same height';
  }
};

/**
 * @description Function to compare diet of dino and human
 * @param {string} dinoDiet - Diet of dino
 * @param {string} humanDiet - Diet of human
 * @returns {string} Diet compared fact
 */
const dietComparator = (dinoDiet, humanDiet) => {
  if (dinoDiet === humanDiet.toLowerCase()) {
    return `You both are ${dinoDiet}es`;
  } else {
    return `Unlike you it is ${dinoDiet}`;
  }
};

/**
 * @description Function to compare location of dino and human
 * @param {string} dinoLoc - Location of dino
 * @param {string} humanLoc - Location of human
 * @returns {string} Location compared fact
 */
const locationComparator = (dinoLoc, humanLoc) => {
  if (dinoLoc === humanLoc) {
    return `Wow! it existed in ${dinoLoc}`;
  } else {
    return `Unlike you it existed in ${dinoLoc}`;
  }
};

/**
 * @description Function to generate random fact for the tile
 * @param {Dino} dino - Dino object to be compared with
 * @param {Human} human - Human object to compare
 * @returns {string} The generated fact
 */
const getFact = (dino, human) => {
  if (dino.name === 'Pigeon') {
    return 'All birds are living dinosaurs.';
  }
  const r = Math.floor(Math.random() * 6) + 1;
  switch (r) {
    case 1:
      return dino.fact;
    case 2:
      return `It is from ${dino.period} period`;
    case 3:
      return weightComparator(dino.weight, human.weight);
    case 4:
      return heightComparator(dino.weight, human.weight);
    case 5:
      return dietComparator(dino.diet, human.diet);
    case 6:
      return locationComparator(dino.location, human.location);
    default:
      return 'Oof!, no fact here';
  }
};

/**
 *
 * @param {Tile[]} tiles
 */
const renderTiles = (tiles) => {
  form.remove();
  const gridFrag = new DocumentFragment();
  tiles.forEach(t => {
    const div = document.createElement('div');
    div.classList.add('grid-item');
    const heading = document.createElement('h3');
    const img = document.createElement('img');
    const p = document.createElement('p');
    heading.innerHTML = t.name;
    img.src = t.image;
    p.innerHTML = t.fact;
    div.appendChild(heading);
    div.appendChild(img);
    div.appendChild(p);
    gridFrag.appendChild(div);
  });
  grid.appendChild(gridFrag);
};

/**
 * @description Function to generate tiles
 * @param {any[]} tilesData - Array of dino and human data
 */
const generateTiles = (tilesData) => {
  const tiles = [];
  tilesData.forEach(t => {
    tiles.push(new Tile(t.name, t.image, t.type === 'HUMAN' ? '' : getFact(t, tilesData[4])));
  });
  renderTiles(tiles);
};

/**
 * @description Function to create date for infographic tiles
 * @param {DinoObject[]} dinoData - Array of dino information data
 */
const createData = (dinoData) => {
  const tiles = dinosCreate(dinoData);
  const human = (function () {
    return new Human(new FormData(form));
  })();
  tiles.splice(4, 0, human);
  generateTiles(tiles);
};

/**
 * @description Function to handle button click
 */
const compare = () => {
  fetch('dino.json')
    .then(response => response.json())
    .then(dinos => {
      createData(dinos.Dinos);
    })
    .catch(err => {
      const errElement = document.createElement('div');
      errElement.classList.add('grid-item');
      errElement.innerHTML = 'Oops' + err;
    });
};

button.addEventListener('click', compare);
