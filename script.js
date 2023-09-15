'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imgContainer = document.querySelector('.images');

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//       <article class="country">
//         <img class="country__img" src="${data.flags.png}"/>
//         <div class="country__data">
//           <h3 class="country__name">${data.name.common}</h3>
//           <h4 class="country__region">${data.subregion}</h4>
//           <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
//           <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
//           <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
//         </div>
//       </article> `;
//       countriesContainer.insertAdjacentHTML('beforeend', html);
//       countriesContainer.style.opacity = 1;
//   });
// }

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('germany');

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}"/>
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.subregion}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${
          Object.values(data.languages)[0]
        }</p>
        <p class="country__row"><span>💰</span>${
          Object.values(data.currencies)[0].name
        }</p>
      </div>
    </article> `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

// // const getCountryAndNeighbour  = function (country) {
// //   // AJAX call country 1
// //   const request = new XMLHttpRequest();
// //   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// //   request.send();

// //   request.addEventListener('load', function () {
// //     const [data] = JSON.parse(this.responseText);
// //     console.log(data);
// //     // render country 1
// //     renderCountry(data);

// //     // get neighbour country (2)
// //     const neighbours = data.borders;
// //     console.log(neighbours);
// //     if (!neighbours) return;

// //     neighbours.forEach(neighbour => {
// //          // AJAX call country 2
// //     const request2 = new XMLHttpRequest();
// //     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
// //     request2.send();

// //     request2.addEventListener('load', function () {
// //       const [data2] = JSON.parse(this.responseText);
// //       console.log(data2);

// //       renderCountry(data2, 'neighbour');
// //     });
// //   });
// // });
// // }
// // getCountryAndNeighbour('germany');

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

// const getCountryData = countryCode => {
//   getJSON(
//     `https://restcountries.com/v3.1/alpha/${countryCode}`,
//     'Country not found'
//   )
//     .then(data => {
//       console.log(data); // Add this to inspect the data structure
//       console.log(data[0]);
//       renderCountry(data[0]); // Access the first element of the array

//       if (!('borders' in data[0])) throw new Error('No neighbour found');
//       const neighbour = data[0].borders;
//       console.log(neighbour);

//       // Return a promise that resolves when all the neighbour data has been fetched
//       return Promise.all(neighbour.map(n => {
//         console.log(n);
//         return getJSON(`https://restcountries.com/v3.1/alpha/${n}`, 'Country not found');
//       }));
//     })
//     .then(data => {
//       console.log(data); // Add this to inspect the data structure
//       data.forEach(neighbourData => {
//         renderCountry(neighbourData[0], 'neighbour'); // Access the first element of the array
//       });
//     })
//     .catch(err => {
//       console.error(`${err}`);
//       renderError(`Something went wrong. ${err.message}. Try again`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', () => {
//   getCountryData('ger');
// });

// Coding Challenge #1

// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json&auth=293020182578850187667x114856`
//   )
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} emoji`));
// };

// whereAmI(52.508, 11.308);

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You win'); // fullfilled (resolved)
//     } else {
//       reject(new Error('You lost')); // rejected
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// promisifying setTimeout

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(5);
//   })
//   .then(() => console.log('I waited for 5 second'));

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos));

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(
//         `https://geocode.xyz/${lat},${lng}?geoit=json&auth=293020182578850187667x114856`
//       );
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} emoji`));
// };

// btn.addEventListener('click', whereAmI);


// ASYNC / AWAIT

// const whereAmI = async function () {
//   try {
//     // Geolocation
//     const position = await getPosition();
//     const { latitude: lat, longitude: lng } = position.coords;
//     // reverse geocoding
//     const responseGeo = await fetch(
//       `https://geocode.xyz/${lat},${lng}?geoit=json&auth=293020182578850187667x114856`
//     );
//     if (!responseGeo.ok) throw new Error('Problem getting location data');
//     const dataGeo = await responseGeo.json();

//     // country data
//     const response = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.country}`
//     );
//     if (!response.ok) throw new Error('Problem getting country');
//     const data = await response.json();
//     console.log(data);
//     renderCountry(data[0]);
//     return `You are in ${dataGeo.city}, ${dataGeo.country}`
//   } catch (err) {
//     console.error(`${err}!!!!!!`);
//     renderError(`${err.message}`);
//     // Reject promise returned from async function
//     throw err;
//   }
// };



// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log( `2: ${city}`);
//   } catch (err) {
//     console.log(`2: ${err.message}`);
//   }
//   console.log('3: Finished getting location');
// })();

//  Lecture 265

const get3Countries = async function(c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log( data1.capital, data2.capital, data3.capital);
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ])
    console.log(data.map(d => d[0].capital));
  } catch(err) {
    console.error(err);

  }
}

get3Countries('portugal', 'canada', 'tanzania');

// Coding Challenge #2
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

// let currentImg;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));

// Coding Challenge #3

const loadNPause =  async function() {
  try {
    // load image 1
    let img = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';
    // load image 2
    img = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch(err) {
    console.error(err);
  }
};

const loadAll = async function(imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img))
    const imgsEl = await Promise.all(imgs)
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch(err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'])
