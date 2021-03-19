import React from 'react';
import styles from "./App.module.scss";
import SearchNumber from "./components/SearchNumber/SearchNumber";
import SearchResult from "./components/SearchResult/SearchResult";
import OldResults from "./components/OldResults/OldResults";
import autobind from "autobind-decorator";
import {IOldResults} from "./utils/primeUitls"
import {Main} from "./utils/primeUitls";


export default class App extends React.Component<{}, {
    currentInputNumber?: number
    currentPrimeNumber?: number
}> {

    //функция для изменения данных, при введении значения пользователем
    @autobind
    private onInputChanged(value: number) {
        const prime = Main.getPrime(value); //вызываем функцию поиска простого числа
        this.setState({
            currentInputNumber: value,
            currentPrimeNumber: prime
        });
        this.oldResultRef.current.workWithHistory(value, prime); //вызываем функцию для записи значений в localStorage
    }

    //функция для передачи старых результатов в форму
    @autobind
    private onHistoryClick(value: IOldResults): void {
        this.searchNumberRef.current.inputNumberRef.current.value = value.number.toString();
        this.setState({
            currentInputNumber: value.number,
            currentPrimeNumber: value.prime
        })
    }

    private readonly searchNumberRef = React.createRef<SearchNumber>();
    private readonly oldResultRef = React.createRef<OldResults>();

    public render() {
        return (
            <div className={styles.appMain}>
                <SearchNumber onInputChanged={this.onInputChanged} ref={this.searchNumberRef}/>
                <span className={styles.appSeparator}/>
                <div>
                    <SearchResult inputNumber={this.state?.currentInputNumber} primeNumber={this.state?.currentPrimeNumber}/>
                    <OldResults onHistoryClick={this.onHistoryClick} ref={this.oldResultRef}/>
                </div>
            </div>
        );
    }
}

