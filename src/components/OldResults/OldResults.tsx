import React from "react";
import {IOldResults} from "../../utils/primeUitls";
import styles from "./OldResults.module.scss";

export default class OldResults extends React.Component<{
    history: IOldResults[]
    onHistoryClick(value: IOldResults): void
}> {

    public render() {
        return (
            <div className={styles.orMain}>
                <span style={{textAlign: "center", marginBottom: "15px"}}>ПРЕДЫДУЩИЕ РЕЗУЛЬТАТЫ</span>
                <div className={styles.orAllButtons}>
                    {this.props.history.map((value, i) =>
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