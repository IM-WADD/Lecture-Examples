const today = new Date();

/**
 * Call the Bank Holidays API to get the next holiday, then display the result.
 */
function getNextHoliday() {
    fetch("https://www.gov.uk/bank-holidays.json")
        .then(function (response){
            return response.json()
        })
        .then(function (data) {
            const events = data["england-and-wales"]["events"];
            for (let event of events) {
                const eventDate = new Date(event.date);
                if (eventDate >= today) {
                    showNextHoliday(event.title, eventDate);
                    break;
                }
            }
        });
}


/**
 * Display the holiday information
 * @param {string} title The name of the holiday
 * @param {Date} date The date of the holiday
 */
const showNextHoliday = (title, date) => {
    const msBetween = date.getTime() - today.getTime();
    const msInDay = 1000 * 60 * 60 * 24;
    const daysToBH = Math.ceil(msBetween / msInDay);
    document.getElementById("days").innerText = daysToBH;
    document.getElementById("holiday").innerText = `${title} on ${date.toDateString()}`;
}

getNextHoliday();