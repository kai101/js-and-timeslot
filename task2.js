let schedules = [
    [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
    [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
    [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
];

// this is boundary non-crossing problem
// but i suspect maybe there is more on that.

// utils function
const pad = (number, size) => {
    var result = "000000000" + number;
    return result.substr(s.length-size);
}
const convertToMinutes = (time) => {
    const [hour,minute] = time.split(':').map(element => parseInt(element, 10));
    return (hour * 60) + minute;
}
const convertToTime = (minute) => {
    const hour = pad(minute/60, 2);
    const minuteResult = pad(minute%60, 2);
    return `${hour}:${minuteResult}`
}

const findSchedule = (minutes, schedules) => {
    // start 09:00
    const formatted = schedules.map(range => range.map(time => time.map(convertToMinutes)));
    const searchBoundry = ['09:00','19:00'].map(convertToMinutes) // establish the boundry

    return ['11:00', '12:00']; // fake and wrong.
}

// at the end 
timeslot = findSchedule(60, schedules)

// check result
console.log(`${timeslot[0]} to ${timeslot[1]}`);