import React from "react";
import autobind from "autobind-decorator";
import styles from "./SearchResult.module.scss";

export default class SearchResult extends React.Component<{
    inputNumber: number
    primeNumber: number
}, {
    inputNumber1: number
    inputNumber2: number
    activeInputNumber: boolean
    primeNumber1: number
    primeNumber2: number
    activePrime: boolean
}> {
    public constructor(props: any) {
        super(props);
        this.state = {
            inputNumber1: null,
            inputNumber2: null,
            activeInputNumber: false,
            primeNumber1: null,
            primeNumber2: null,
            activePrime: false
        };
    }

    public render() {
        return (
            <div className={styles.srMain}>
                <span className={styles.srHeader}>РЕЗУЛЬТАТ</span>
                <div className={styles.subHeader}>
                    <span>Введённое число:&nbsp;</span>
                    <div className={styles.srNumbers}>
                        <span className={!this.state.activeInputNumber ? styles.showNumberBefore : styles.hideNumberBefore}>{this.state.inputNumber1}</span>
                        <span className={this.state.activeInputNumber ? styles.showNumberAfter : styles.hideNumberAfter}>{this.state.inputNumber2}</span>
                    </div>
                </div>
                <div className={styles.subHeader}>
                    <span>Простое n'ое число:&nbsp;</span>
                    <div className={styles.srPrimes} style={{marginBottom: "5px"}}>
                        <span className={!this.state.activePrime ? styles.showNumberBefore : styles.hideNumberBefore}>{this.state.primeNumber1}</span>
                        <span className={this.state.activePrime ? styles.showNumberAfter : styles.hideNumberAfter}>{this.state.primeNumber2}</span>
                    </div>
                </div>
                <span className={styles.srSeparator}/>
            </div>
        );
    }

    @autobind
    componentDidUpdate(prevProps: Readonly<{ inputNumber: number; primeNumber: number }>, prevState: Readonly<{ inputNumber1: number; inputNumber2: number; activeInputNumber: boolean; primeNumber1: number; primeNumber2: number; activePrime: boolean }>, snapshot?: any) {
        if(prevProps.primeNumber !== this.props.primeNumber || prevProps.inputNumber !== this.props.inputNumber) {
           this.setState({
               inputNumber1: !this.state.activeInputNumber ? prevProps.inputNumber : this.props.inputNumber,
               inputNumber2: this.state.activeInputNumber ? prevProps.inputNumber : this.props.inputNumber,
               activeInputNumber: !this.state.activeInputNumber,
               primeNumber1: !this.state.activePrime ? prevProps.primeNumber : this.props.primeNumber,
               primeNumber2: this.state.activePrime ? prevProps.primeNumber : this.props.primeNumber,
               activePrime: !this.state.activePrime
           });
        }
    }
}