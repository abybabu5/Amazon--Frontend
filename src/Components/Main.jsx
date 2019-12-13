import React, {Component} from 'react';
import Item from "../Components/Item";
import "bootstrap/dist/css/bootstrap.min.css";
import {Api} from "../Api";
import ItemList from "./ItemList";

class Main extends Component {
    state = {items: []};
    componentDidMount = ()  => {
        setInterval(() => this.loadData(),10000);
        this.loadData();
    };
    loadData = () => {
        Api.fetch("/items").then((items) => this.setState(items: items}));
    };
    render() {
        return (
            <div>
                <ItemList items={this.state.items} refresh={this.loadData} />
            </div>
        );
    }
}

export default Main;