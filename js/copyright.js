// handel copy right's year
const copyRightYearEl = document.querySelector(".copy-right-year");

const date = new Date();
copyRightYearEl.textContent= `${date.getFullYear()}`;