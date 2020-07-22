import React, { Component } from "react";

class Converter extends Component {
    state = {
        currencies: ["BRL", "EUR", "USD"],
        base: "BRL",
        amount: "0",
        convertTo: "USD",
        result: "0",
        date: ""
    };

    handleSelect = e => {
        this.setState(
            {
                [e.target.name]: e.target.value,
                result: null
            },
            this.calculate
        );
    };

    handleInput = e => {
        this.setState(
            {
                amount: e.target.value,
                result: null,
                date: null
            },
            this.calculate
        );
    };

    calculate = () => {
        const amount = this.state.amount;
        if (amount === isNaN) {
            return null;
        } else {
            fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
                .then(res => res.json())
                .then(data => {
                    const date = data.date;
                    const result = (data.rates[this.state.convertTo] * amount).toFixed(4);
                    this.setState({
                        result,
                        date
                    });
                });
        }
    };

    handleSwap = e => {
        const base = this.state.base;
        const convertTo = this.state.convertTo;
        e.preventDefault();
        this.setState(
            {
                convertTo: base,
                base: convertTo,
                result: null
            },
            this.calculate
        );
    };

    render() {
        const { currencies, base, amount, convertTo, result, date } = this.state;
        return (
            <div className="container my-5">
                <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">React Currency Application</h5>
                            <p className="card-text">
                                {amount} {base} is equivalent to {amount === "" ? "0" : result === null ? "Calculating..." : result}{" "}
                                {convertTo}
                            </p>
                            <p>Date: {amount === "" ? "/ / /" : date === null ? "" : date}</p>
                        </div>
                    <div className="row">
                        <div className="col-lg-10">
                            <form className="form-inline mb-4">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={this.handleInput}
                                    className="form-control form-control-lg mx-3"
                                />
                                <select
                                   name="base"
                                   value={base}
                                   onChange={this.handleSelect}
                                   className="form-control form-control-lg">
                                    {currencies.map(currency => (
                                       <option key={currency} value={currency}>
                                        {currency}
                                       </option>
                                    ))}
                                </select>
                            </form>
                            <form className="form-inline mb-4">
                                <input
                                    disabled={true}
                                    value={amount === "" ? "0" : result === null ? "Calculating..." : result}
                                    className="form-control form-control-lg mx-3"
                                />
                                <select
                                    name="convertTo"
                                    value={convertTo}
                                    onChange={this.handleSelect}
                                    className="form-control form-control-lg">
                                    {currencies.map(currency => (
                                        <option key={currency} value={currency}>
                                            {currency}
                                        </option>
                                    ))}
                                </select>
                            </form>
                            <div className="container my-4">
                                <button type="button" className="btn btn-secondary" onClick={this.handleSwap}>
                                    INVERT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Converter;
