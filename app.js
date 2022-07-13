const form = document.querySelector(`.container__form`);
const displayContainer = document.querySelector(`.display-container`);

/* Create and initialise the request object */
function initRequest(method, url) {
  const request = new XMLHttpRequest();
  request.open(method, url);
  return request;
}

/* Add the various styling class to the elements */
function initClass(arr) {
  for (let el of arr) {
    switch (el.nodeName) {
      case `UL`:
        el.classList.add(`display__ul`);
        break;
      case `DIV`:
        el.classList.add(`display__div`);
        break;
      case `LI`:
        el.classList.add(`display__li`);
        break;
      case `IMG`:
        el.classList.add(`display__img`);
    }
  }
  return arr;
}

/* Create and initialise all the DOM objects needed */
function initElements() {
  const ul = document.createElement(`ul`);
  const div = document.createElement(`div`);
  const [nameLi, nationLi, photoLi] = [
    document.createElement(`li`),
    document.createElement(`li`),
    document.createElement(`li`),
  ];
  const img = document.createElement(`img`);
  const arrElems = [ul, div, nameLi, nationLi, photoLi, img];
  return initClass(arrElems);
}

/* Use data retrieve from the Api, nest it in the new elements then append all  */
function retrieveData(func, data) {
  const [ul, div, nameLi, nationLi, photoLi, img] = func();
  const name = data.results[0].name;
  const nation = data.results[0].location;
  const photoUrl = data.results[0].picture.medium;
  const { title, first, last } = name;
  const { city, country, postcode, state, street } = nation;
  nameLi.textContent = `${title} ${last.toUpperCase()} ${first}`;
  nationLi.textContent = `${street.number} ${street.name}, ${city} ${postcode}, ${country}`;
  div.append(nameLi, nationLi);
  img.src = photoUrl;
  photoLi.append(img);
  ul.append(div, photoLi);
  displayContainer.append(ul);
}

/* All request related functions are nested here */
function requestHandler(evt) {
  const req = initRequest(`GET`, `https://randomuser.me/api/`);
  req.addEventListener(`load`, () => {
    let parsedEntry = JSON.parse(req.responseText);
    retrieveData(initElements, parsedEntry);
  });
  req.addEventListener(`error`, (evt) => {
    console.log(`ERROR! Event: ${evt}`);
  });
  req.send();
}

form.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  requestHandler(evt);
});
