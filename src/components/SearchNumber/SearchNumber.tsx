import * as React from "react";
import autobind from "autobind-decorator";
import styles from "./SerchNumber.module.scss";

export default class SearchNumber extends React.Component<{
    onInputChanged(value: number): void
}, {
    errorNotification: string
}>{
    public readonly inputNumberRef: React.RefObject<HTMLInputElement> = React.createRef();

    @autobind
    public onClick() {
        const inputNumber = this.inputNumberRef.current.value;
        const parsedInput = Number(inputNumber);
        const isValidNumber = !Number.isNaN(parsedInput);

        if (!isValidNumber) {
            this.setState({errorNotification: "Введено некорректное значение. Пожалуйста, используйте только цифры!"})
        } else if (!inputNumber || (parsedInput <= 0)) {
            this.setState({errorNotification: "Поле пустое, введён ноль или отрицательное значение. Пожалуйста, повторите ввод (>= 1)"})
        } else {
            this.props.onInputChanged(parsedInput);
            this.setState({errorNotification: ""});
        }
    }

    public render() {
        return (
            <div className={styles.snMain}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <span className={styles.snHeader}>ВВЕДИТЕ ЧИСЛО:</span>
                    <input className={styles.snInput} ref={this.inputNumberRef} placeholder="целое положительное число"/>
                    <span className={styles.snNotification}>{this.state?.errorNotification}</span>
                    <button className={styles.snButton} onClick={this.onClick}>Найти простое число</button>
                </div>
            </div>
        );
    }
}