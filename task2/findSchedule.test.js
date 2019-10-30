import findSchedule from './findSchedule.js'

describe('findSchedule', () => {
    it('should throw error when no suitable time slot', () => {
        expect(() => {
            findSchedule(60, [[['09:00', '19:00']]]);
        }).toThrow(new Error('No Suitable time slot.'));
    });
})
