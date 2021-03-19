export interface IOldResults {
    number: number
    prime: number
}

//класс, в котом реализуется алгоритм поиска простого числа
//данный алгоритм реализует решето Аткина
export class Main {
    private static SIEVE: boolean[];
    private static BLOCK_SIZE: number = 10000;

    private static flip(n: number): void {
        this.SIEVE[n] = !this.SIEVE[n];
    }

    public static getPrime(targetN: number): number {
        if (targetN === 1) {
            return 2;
        }
        if (targetN === 2) {
            return 3;
        }
        Main.SIEVE = [];
        let from = 0;
        let to = Main.BLOCK_SIZE;
        while (true) {
            Main.getPrimesUpTo(from,to);
            let prime = Main.getPrimeFromSieve(to, targetN);
            if (prime > 0) {
                return prime;
            }
            from += Main.BLOCK_SIZE;
            to += Main.BLOCK_SIZE;
        }
    }

    public static getPrimeFromSieve(to, targetN) {
        let n = 2;
        for (let i = 0; i <= to; i++) {
            if(Main.SIEVE[i]){
                n++;
                if(n === targetN) {
                    return i;
                }
            }
        }
        return -1;
    }

    public static getPrimesUpTo(from, to) {
        //предварительное просеивание
        for (let x2 = 1, dx2 = 3; x2 < to; x2 += dx2, dx2 += 2) {
            for (let y2 = 1, dy2 = 3, n; y2 < to; y2 += dy2, dy2 += 2) {

                n = (x2 << 2) + y2;
                if(n < from) {
                    continue;
                }
                if (n <= to && (n % 12 === 1 || n % 12 === 5)) {
                    Main.flip(n);
                }

                n -= x2;
                if (n <= to && n % 12 === 7) {
                    if(n >= from) {
                        Main.flip(n);
                    }
                }

                if (x2 > y2) {
                    n -= y2 << 1;
                    if (n <= to && n % 12 === 11) {
                        if(n >= from) {
                            Main.flip(n);
                        }
                    }
                }
            }
        }

        //все числа, кратные квадратам, помечаются как составные
        let r = 5;
        for (let r2 = r * r, dr2 = (r << 1) + 1; r2 < to; ++r, r2 += dr2, dr2 += 2) {
            if (Main.SIEVE[r]) {
                for (let mr2 = r2; mr2 < to; mr2 += r2) {
                    if (mr2>= from && mr2 < to) {
                        Main.SIEVE[mr2] = false;
                    }
                }
            }
        }
    }
}