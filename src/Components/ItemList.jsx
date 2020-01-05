import React, {Component} from 'react';
import {ListGroup} from 'react-bootstrap';
import axios from 'axios';
import { saveAs } from 'file-saver';
import {Api} from "./Api";


class ItemList extends Component {
    onDelete = (item) => {
        Api.fetch("/products/" + item._id, "DELETE").then(res => {
            console.log(res);
            this.props.refresh();
        });
    };
    onEdit = (item) => {
        this.props.onEdit(item);
    };
    onDownload = (item) => {
        axios.post('/create-pdf', this.state)
            .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

                saveAs(pdfBlob, 'newPdf.pdf');
            })
    };

    render() {
        return (
            <div className={'container'}>
                <ListGroup as="ul">
                    {this.props.items.map(item => <ListGroup.Item as="li" active key={item._id} style={{
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
                            <div>
                                <div onClick={(e) => this.onEdit(item)}><i className='fas fa-edit'></i></div>
                                <div onClick={(e) => this.onDelete(item)}><i className='fas fa-trash'></i></div>
                                <div><a style={{color: 'white'}} href={'http://localhost:3100/products/pdf/'+item._id}><i className='fas fa-download'></i></a></div>
                            </div>
                        </div>
                    </ListGroup.Item>)}
                </ListGroup>
            </div>
        );
    }
}

export default ItemList;
