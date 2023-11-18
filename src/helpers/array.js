export const shuffle = (array, shuffleLevel) => {
  let result = array;
  for (let index = 0; index < shuffleLevel; index++) {
    result = result.sort(() => Math.random() - 0.5);
  }
  return result;
};

export const randomNumber = (min, max) => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
