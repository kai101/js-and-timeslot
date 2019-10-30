import {
    convertToTime,
    convertToMinutes
} from './utils.js';

import {
    STATUS_AVAILABLE,
    STATUS_CONFLICT,
    START,
    END
} from './constants.js';

const checkConflict = (slot, schedules, pointer = 0) => {
    console.log('slot, schedules, pointer', slot, schedules, pointer)
    const [slotStart, slotEnd] = slot;
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
            (person,collectedIndex) => checkConflict(evalTimeSlot, person, lastCollectedResults[collectedIndex] ? lastCollectedResults[collectedIndex].pointer : 0)
        );
        lastCollectedResults = [...collectedResults]
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

    const result = evalTimeSlot.map(convertToTime);

    return result;
}

export default findSchedule