import React, {Component} from 'react';
import {Api} from "./Api";
import {ListGroup} from "react-bootstrap";
import Review from "./Review";

class ProductDetail extends Component {
    state = {product: null};
    componentDidMount() {
        Api.fetch("/products/" + this.props.match.params.id).then((p) => this.setState({product: p}))
    }

    render() {
        const item = this.state.product || {};
        return (
            <ListGroup as="ul">
                <ListGroup.Item as="li" active key={item._id} style={{
                    marginBottom: '10px',
                    borderRadius: '5px'
                }}>
            <div style={{display: 'flex'}} className="product-container">
                <div>
                    {item.imageUrl && <img src={item.imageUrl} className="product-image"/>}
                </div>
                <div className="details-container">
                    <div className="product-name">{item.name}</div>
                    <div className="product-description">{item.description}</div>
                    <div>{item.brand}</div>
                    <div>{item.price}</div>
                    <div>{item.category}</div>

                </div>
                {/*<div>*/}
                {/*    <div onClick={(e) => this.onEdit(item)}><i className='fas fa-edit'></i></div>*/}
                {/*    <div onClick={(e) => this.onDelete(item)}><i className='fas fa-trash'></i></div>*/}
                {/*    <div><a style={{color: 'white'}} href={'http://localhost:3100/products/pdf/'+item._id}><i className='fas fa-download'></i></a></div>*/}
                {/*</div>*/}
            </div>
                    <div>
                        <Review id={item._id} />
                    </div>
                </ListGroup.Item>
            </ListGroup>
        );
    }
}

export default ProductDetail;