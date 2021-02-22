export interface IOldResults {
    number: number
    prime: number
}

const simpleMap = new Map();
let maxN = 0;
let maxProcessed = 0;

function isPrime(num) {
    for(let i = 2; i < num; i++)
        if(num % i === 0) return false;
    return num > 1;
}

export function getPrime(n) {
    while (maxN < n) {
        maxProcessed++;
        if (isPrime(maxProcessed)) {
            maxN++;
            simpleMap.set(maxN, maxProcessed);
        }
    }
    return simpleMap.get(n);
}