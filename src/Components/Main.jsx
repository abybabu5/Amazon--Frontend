import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Item from "./Item";
import {Api} from "./Api";


class Main extends Component {
    state = {items: []};
    componentDidMount = () => {
        setInterval(() => this.loadData(), 10000);
        this.loadData();
    };
    loadData = () => {
        Api.fetch("/products").then((items) => this.setState({items: items}));
    };

    render() {
        return (

            <Router>
                <Route path='/' exact>
                    <Item items={this.state.items} refresh={this.loadData}/>
                </Route>
            </Router>
        );
    }
}

export default Main;