import React from "react";
import {IOldResults} from "../../utils/primeUitls";
import styles from "./OldResults.module.scss";
import autobind from "autobind-decorator";

export default class OldResults extends React.Component<{
    onHistoryClick(value: IOldResults): void
}> {
    private readonly history?: IOldResults[] = [];

    constructor(props: {}) {
        super(props as any);
        const lsHistory = localStorage.getItem("history"); //передаем в переменную содержимое localStorage
        this.history = lsHistory ? JSON.parse(lsHistory) : [];  //парсим массив или создаем новый в случае, если в LS отсутствуют данные
    }

    @autobind
    public workWithHistory(inputNumber, primeNumber) {
        let value = inputNumber;
        let prime = primeNumber;
        this.history.push({number: value, prime});
        localStorage.setItem("history", JSON.stringify(this.history)); //записываем новые данные в localStorage
    }

    public render() {
        return (
            <div className={styles.orMain}>
                <span className={styles.orTitle}>ПРЕДЫДУЩИЕ РЕЗУЛЬТАТЫ</span>
                <div className={styles.orAllButtons}>
                    {this.history.map((value, i) =>
                        <button className={styles.orButton} key={i} onClick={() => this.props.onHistoryClick(value)}>
                                <span>Введённое число: {value.number}</span>
                                <span>Простое n'ое число: {value.prime}</span>
                        </button>
                    )}
                </div>
            </div>
        );
    }
}