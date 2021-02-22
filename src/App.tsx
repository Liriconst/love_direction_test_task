import React from 'react';
import styles from "./App.module.scss";
import SearchNumber from "./components/SearchNumber/SearchNumber";
import SearchResult from "./components/SearchResult/SearchResult";
import OldResults from "./components/OldResults/OldResults";
import autobind from "autobind-decorator";
import {getPrime, IOldResults} from "./utils/primeUitls";

export default class App extends React.Component<{}, {
    currentInputNumber?: number
    currentPrimeNumber?: number
}> {
    private readonly history?: IOldResults[] = [];

    constructor(props: {}) {
        super(props);
        const lsHistory = localStorage.getItem("history");
        this.history = lsHistory ? JSON.parse(lsHistory) : [];
    }

    @autobind
    private onInputChanged(value: number) {
        const prime = getPrime(value);
        this.history.push({number: value, prime});
        localStorage.setItem("history", JSON.stringify(this.history));
        this.setState({
            currentInputNumber: value,
            currentPrimeNumber: prime
        });
    }

    @autobind
    private onHistoryClick(value: IOldResults): void {
        this.searchNumberRef.current.inputNumberRef.current.value = value.number.toString();
        this.setState({
            currentInputNumber: value.number,
            currentPrimeNumber: value.prime
        })
    }

    private readonly searchNumberRef = React.createRef<SearchNumber>();

    public render() {
        return (
            <div className={styles.appMain}>
                <SearchNumber onInputChanged={this.onInputChanged} ref={this.searchNumberRef}/>
                <span className={styles.appSeparator}/>
                <div>
                    <SearchResult inputNumber={this.state?.currentInputNumber} primeNumber={this.state?.currentPrimeNumber}/>
                    <OldResults history={this.history} onHistoryClick={this.onHistoryClick}/>
                </div>
            </div>
        );
    }
}

