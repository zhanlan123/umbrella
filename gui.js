export const controls = [{
    id: 'horizontalMovementOffset',
    type: 'range',
    min: -2,
    max: 2,
    step: 0.1,
    value: 0
}, {
    id: 'horizontalMovementMax',
    type: 'range',
    min: 0,
    max: 10,
    step: 1,
    value: 1
},{
    id: 'verticalMovementOffset',
    type: 'range',
    min: -100,
    max: 100,
    step: 1,
    value: -1
}, {
    id: 'verticalMovementMax',
    type: 'range',
    min: -100,
    max: 100,
    step: 1,
    value: 5
},{
    id: 'sound',
    type: 'range',
    min: 0,
    max: 1,
    step: 1,
    value: 0
}, {
    id: 'color',
    type: 'range',
    min: 0,
    max: 2,
    step: 1,
    value: 0
}];