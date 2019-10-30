let schedules = [
    [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
    [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
    [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
];

// this is boundary non-crossing problem
// but i suspect maybe there is more on that.

// utils function
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
const STATUS_AVAILABLE = 'available';
const STATUS_CONFLICT = 'conflict';
const START = 0;
const END = 1;

const checkConflict = (slot, schedules, pointer = 0) => {
    // before thought, return strategy need to return object contain available or conflicted time slot for later all search.
    // {
    //     status: 'available' // or 'conflict'
    //     timeslot:['09:00', '10:00'] // if available return the available timeslot, if schedule conflict return the conflict slot to find the next starting point.
    // }

    //  might need not to search, high chance we need to put a search pointer on every person.
    const [slotStart, slotEnd] = slot;
    let preSlot = schedules[pointer];
    let i = pointer;
    for(; i < schedules.length; i++){
        const [curStart, curEnd] = schedules[i]
        if((slotStart >= curStart && slotStart < curEnd) || (slotEnd > curStart && slotEnd <= curEnd)) {
            return {
                status: STATUS_CONFLICT,
                timeslot: schedules[i],
                pointer: i
            }
        } else if(curStart >= slotEnd) {
            // can stop evaluating when loop till meeting later than the evaluation.
            return {
                status: STATUS_AVAILABLE,
                timeslot: slot,
                pointer: i
            }
        }
    }

    // if no conflict and finish evaluating the user meeting, then it is available.
    return {
        status: STATUS_AVAILABLE,
        timeslot: slot,
        pointer: i
    }
}

const findSchedule = (minutes, schedules) => {
    const formattedSchedules = schedules.map(range => range.map(time => time.map(convertToMinutes)));
    const searchBoundry = ['09:00','19:00'].map(convertToMinutes) // establish the search boundry
    let evalTimeSlot = [searchBoundry[START], searchBoundry[START]+minutes];
    let lastCollectedResults = []
    let lastHasConflict = null
    while(evalTimeSlot[END] < searchBoundry[END]){
        const collectedResults = formattedSchedules.map(
            (person,collectedIndex) => checkConflict(evalTimeSlot, person, lastCollectedResults[collectedIndex] || 0)
        );
        const hasConflict = lastHasConflict = collectedResults.find(result => result.status === STATUS_CONFLICT)
        if(hasConflict) {
            const nextBestStartTime = collectedResults.reduce((acc, cur)=> {
                if(cur.status === STATUS_CONFLICT){
                    return acc < cur.timeslot[END] ? cur.timeslot[END] : acc; 
                } else {
                    return acc
                }
                    
            },0);
            evalTimeSlot = [nextBestStartTime, nextBestStartTime+minutes];
        } else {
            break;
        }
    }
    
    if(lastHasConflict){
        throw new Error('No Suitable time slot.');
    }
    const result = evalTimeSlot.map(convertToTime);// temporary convert back for debuging purpose


    return result; // fake and wrong.
}

// at the end 
timeslot = findSchedule(60, schedules)

// check result
console.log(`${timeslot[0]} to ${timeslot[1]}`);