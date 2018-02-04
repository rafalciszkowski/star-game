import React, { Component } from 'react';
import StarList from './StarList.js';
import NumberList from './NumberList.js';

import CheckButton from './CheckButton.js';
import SelectedNumberList from './SelectedNumberList.js';
import RefreshButton from './RefreshButton.js';
import _ from 'underscore';


class Game extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.selectNumber = this.selectNumber.bind(this);
        this.unselectNumber = this.unselectNumber.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        this.playNextRound = this.playNextRound.bind(this);
        this.refreshStars = this.refreshStars.bind(this);
        this.possibleCombinationSum = this.possibleCombinationSum.bind(this);
    }

    getInitialState() {
        return {
            numberOfStars: 0,
            selectedNumbers: [],
            isAnswerCorrect: null,
            usedNumbers: [],
            refreshCounter: 5
        };
    }

    componentDidMount() {
        this.setRandomNumberOfStars();
    }

    setRandomNumberOfStars() {
        let randomNumberOfStars;
        do {
            randomNumberOfStars = Math.floor(Math.random() * 10) + 1;
        }
        while (this.state.numberOfStars === randomNumberOfStars);

        this.setState({ numberOfStars: randomNumberOfStars });
    }

    selectNumber(number) {
        if (this.state.selectedNumbers.indexOf(number) !== -1) return;

        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.concat(number)
        }));
    }

    unselectNumber(numberToRemove) {
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.filter((number) => number !== numberToRemove)
        }));
    }

    checkAnswer() {
        let sum = this.state.selectedNumbers.reduce((a, b) => a + b);
        if (this.state.numberOfStars === sum) {
            this.setState({ isAnswerCorrect: true });
        } else {
            this.setState({ isAnswerCorrect: false });
        }
    }

    playNextRound() {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers)
        }),
            () => {
                let greenNumbers = _.range(1, 10).filter(elem => this.state.usedNumbers.indexOf(elem) === -1);
                let canPlay = this.state.refreshCounter > 0 ||
                    this.possibleCombinationSum(greenNumbers, this.state.numberOfStars);
                if (canPlay) {
                    this.setRandomNumberOfStars();
                    this.setState({ isAnswerCorrect: null, selectedNumbers: [] });
                }
                else {
                    if (window.confirm('GAME OVER\nDo you want to play again?')) {
                        this.setState(this.getInitialState(),this.setRandomNumberOfStars);
                    }
                }
            }
        );
    }

    refreshStars() {
        this.setRandomNumberOfStars();
        if (this.state.refreshCounter > 0) {
            this.setState(prevState => ({
                refreshCounter: prevState.refreshCounter - 1
            }))
        }
    }

    possibleCombinationSum(arr, n) {
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
            arr.pop();
            return this.possibleCombinationSum(arr, n);
        }
        var listSize = arr.length, combinationsCount = (1 << listSize)
        for (var i = 1; i < combinationsCount; i++) {
            var combinationSum = 0;
            for (var j = 0; j < listSize; j++) {
                if (i & (1 << j)) { combinationSum += arr[j]; }
            }
            if (n === combinationSum) { return true; }
        }
        return false;
    };

    render() {
        const { numberOfStars, selectedNumbers, isAnswerCorrect, usedNumbers, refreshCounter } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <StarList numberOfStars={numberOfStars} />
                    </div>
                    <div className="col-sm-4">
                        <CheckButton selectedNumbers={selectedNumbers} isAnswerCorrect={isAnswerCorrect}
                            checkAnswer={this.checkAnswer} playNextRound={this.playNextRound} />
                        <RefreshButton refreshCounter={refreshCounter} refreshStars={this.refreshStars} />
                    </div>
                    <div className="col-sm-4">
                        <SelectedNumberList selectedNumbers={selectedNumbers}
                            unselectNumber={this.unselectNumber} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm number-list">
                        <NumberList selectNumber={this.selectNumber}
                            selectedNumbers={selectedNumbers}
                            unselectNumber={this.unselectNumber}
                            usedNumbers={usedNumbers} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;