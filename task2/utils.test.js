import {
    convertToMinutes,
    convertToTime
} from './utils.js'

describe('utils', () => {
    describe('convertToMinutes', () => {
        it('should convert time string to minute', ()=>{
            expect(convertToMinutes('11:30')).toBe(690);
            expect(convertToMinutes('00:00')).toBe(0);
            expect(convertToMinutes('17:15')).toBe(1035);
        })
    })

    describe('convertToTime', () => {
        it('should convert minute to time string', ()=>{
            expect(convertToTime(690)).toBe('11:30');
            expect(convertToTime(0)).toBe('00:00');
            expect(convertToTime(1035)).toBe('17:15');
        })
    })
})