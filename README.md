# js-and-timeslot


### ```npm run task1```
will run all the ```console.assert()```

Basic and standard implementation.

Additional ```console.assert(add4(0,0) === 0)``` added due to lack of consideration of falsy value in my initial implementation.

### ```npm run task2```
will run task2 solution and give the result of the test case given ```['12:15', '1:15']```

Implementation base on 1 pointer per person search to deduce the timing that works for everyone.

Achieved pretty good performance that avoid many of the waste loop.


### Potential solution for task 2
Other potential solution that I can think of at this moment is converging everyone schedule into one, and then search for a empty time slot.

While the search will be fast, the converging part will be slow.
Unless a good converging method is reach, current implementation is the safest and straight forward.