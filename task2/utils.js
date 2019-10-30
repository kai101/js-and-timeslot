
const pad = (number, size) => {
    let result = "000000000" + number;
    return result.substr(result.length-size);
}
const convertToMinutes = (time) => {
    const [hour,minute] = time.split(':').map(element => parseInt(element, 10));
    return (hour * 60) + minute;
}
const convertToTime = (minute) => {
    const hour = pad(Math.floor(minute/60), 2);
    const minuteResult = pad(minute%60, 2);
    return `${hour}:${minuteResult}`
}

export {
    convertToMinutes,
    convertToTime
}