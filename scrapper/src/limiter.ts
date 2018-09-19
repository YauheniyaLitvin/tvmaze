
import config from './config'

let ti : any;
let counter = 0;
let queue : any = []

export function limit (fn: any, max = config.get('CALLSLIMIT'),   msDuration = config.get('TIMELIMIT')){
    if (!ti) ti = setInterval(nextInterval, msDuration)
    let ok = (counter < max)
    if (ok) {
        counter ++
        return fn()
    }
    queue.push(fn)
}

function nextInterval(max = config.get('CALLSLIMIT')){
    counter = 0
    if (!queue.length) return
    while ((counter < max) && queue.length){
        const fn = queue.shift()
        fn()
        counter ++
    }
}