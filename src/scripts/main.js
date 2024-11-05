'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(`First promise was resolved`);
  });

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('auxclick', (evt) => {
    if (evt.button === 2) {
      resolve(`Second promise was resolved`);
    }
  });

  document.addEventListener('click', (evt) => {
    resolve(`Second promise was resolved`);
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('auxclick', (evt) => {
    if (evt.button === 2) {
      rightClicked = true;
      checkBothClicks();
    }
  });

  document.addEventListener('click', () => {
    leftClicked = true;
    checkBothClicks();
  });

  const checkBothClicks = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  };
});

const promiseMessage = (raport) => {
  const messageDiv = document.createElement('div');
  const isError = raport instanceof Error;

  messageDiv.setAttribute('data-qa', 'notification');
  messageDiv.className = isError ? 'error' : 'success';
  messageDiv.textContent = isError ? raport.message : raport;
  document.body.appendChild(messageDiv);
};

firstPromise.then(promiseMessage).catch(promiseMessage);
secondPromise.then(promiseMessage).catch(promiseMessage);
thirdPromise.then(promiseMessage).catch(promiseMessage);
