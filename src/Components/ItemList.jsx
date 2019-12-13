import React, {Component} from 'react';
import {ListGroup} from 'react-bootstrap';
import {Api} from "../Api";


class ItemList extends Component {
    onDelete = (item) => {
        Api.fetch("/items/" + item._id, "DELETE").then(res => {
            console.log(res);
            this.props.refresh();
        });
        this.onEdit = (item) => {
            this.props.onEdit(item);
        };
        render()
        {
            return (
                <div className={'container'}>
                    <ListGroup as="ul">
                        {this.props.items.map(item => <ListGroup.Item as="li" active key={item._id} style={{
                            marginBottom: '10px',
                            borderRadius: '5px'
                        }}>
                            <div style={{display: 'flex'}} className="student-container">
                                <div>
                                    {item.picture && <img src={item.picture} className="user-image"/>}
                                </div>
                                <div className="details-container">
                                    <div>{item.itemName}</div>
                                    <div>{item.itemDescription}</div>
                                    <div>{item.itemBrand}</div>
                                    <div>{item.itemPrice}</div>
                                    <div>{item.itemCategory}</div>

                                </div>
                                <div>
                                    <div onClick={(e) => this.onEdit(item)}><i className='fas fa-edit'></i></div>
                                    <div onClick={(e) => this.onDelete(item)}><i className='fas fa-trash'></i></div>
                                </div>
                            </div>
                        </ListGroup.Item>)}
                    </ListGroup>
                </div>

        }
    }

    export default ItemList;