// the number of days the discount will be available
const DISCOUNT_DAYS = 2;
const DISCOUNT_DEADLINE = new Date(new Date().getTime() + (DISCOUNT_DAYS * 24 * 60 * 60 * 1000));

function countdown() {
    let today = new Date();
    let totalSeconds = (DISCOUNT_DEADLINE - today) / 1000;

    let seconds = Math.floor(totalSeconds % 60);
    let minutes = Math.floor((totalSeconds / 60) % 60);
    let hours = Math.floor((totalSeconds / 3600) % 24);
    let days = Math.floor(totalSeconds / 3600 / 24);

    // console.log(days, hours, minutes, seconds);

    let secondsContainer = document.getElementById("seconds");
    secondsContainer.innerHTML = leftFillNum(seconds);

    let minutesContainer = document.getElementById("minutes");
    minutesContainer.innerHTML = leftFillNum(minutes);

    let hoursContainer = document.getElementById("hours");
    hoursContainer.innerHTML = leftFillNum(hours);

    let daysContainer = document.getElementById("days");
    daysContainer.innerHTML = leftFillNum(days);
}

function leftFillNum(num, targetLength = 2) {
    // a function to pad the number to the left if it is shorter than targetLength
    // to display all numbers in two digit format, pad zero to the left when necessary
    return num.toString().padStart(targetLength, 0);
}

setInterval(countdown, 1000);
