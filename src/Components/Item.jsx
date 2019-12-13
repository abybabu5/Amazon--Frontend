import React from 'react';
import {Row, Col,Container} from 'reactstrap';
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import ItemList from "../Components/ItemList";
import {Api} from "./Api";


class Item extends React.Component {
    state = {modal: false};
    onFormSubmit = (e) => {
        if (this.state._id) {
            Api.fetch("/products/" + this.state._id, "PUT", this.state).then(res => {
                console.log("edit", res);
                this.props.refresh();
            });

        } else {
            Api.fetch("/products", "POST", this.state).then(res => {
                console.log("inserted", res);
                this.props.refresh()
            });
        }
        this.setState({_id: undefined});
        this.toggle();
    };
    updateForm = (e) => {
        this.setState({[e.target.id]: e.target.value});
    };
    formRequire = (e) => {
        return !(this.state.name && this.state.description);
    };
    toggle = () => {
        this.setState({modal: !this.state.modal});
    };
    onEdit = (item) => {
        console.log(item);
        this.setState({...item});
        this.toggle();
    };
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                    <div>
                        <h1>Welcome to the new Amazon Shopping Experience</h1>
                    </div>
                        <div>
                            <button className="btn btn-primary mb-3" onClick={this.toggle}><i
                                className="far fa-edit" id="newsfeedPencil"></i> Add Items
                            </button>
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader className="modalHeaderNfModal" toggle={this.toggle}>Enter Item
                                Details</ModalHeader>
                            <ModalBody>
                                <Container className={'productForm'}>

                                    <form autoComplete="off" id="form">
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Product Name</label>
                                                <input type="text" className="form-control" id="name" placeholder="Item Name"
                                                       defaultValue={this.state.name}
                                                       onChange={this.updateForm}/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Product Description</label>
                                                <input type="text" className="form-control" id="description"
                                                       placeholder="Item Description" defaultValue={this.state.description}
                                                       onChange={this.updateForm}/>
                                            </div>

                                        </div>
                                        <div className="form-group">
                                            <label>Product Brand</label>
                                            <input type="text" className="form-control" id="brand"
                                                   placeholder="Item Brand" onChange={this.updateForm}
                                                   defaultValue={this.state.brand}
                                                   onChange={this.updateForm}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Price</label>
                                            <input type="number" className="form-control" id="price"
                                                   placeholder="$" onChange={this.updateForm}
                                                   defaultValue={this.state.price}
                                                   onChange={this.updateForm}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Category</label>
                                            <input type="text" className="form-control" id="category"
                                                placeholder="Category" onChange={this.updateForm}
                                                defaultValue={this.state.category}
                                                   onChange={this.updateForm}/>

                                        </div>
                                    <div>
                                        <label>Image URL</label>
                                        <textarea  className="form-control" id="imageUrl"

                                                   defaultValue={this.state.imageUrl}
                                                   placeholder="http://..." onChange={this.updateForm}/>
                                        </div>
                                        <button type="button" className="btn btn-primary"
                                                disabled={this.formRequire() ? 'disabled' : null}
                                                onClick={this.onFormSubmit}>Submit
                                        </button>
                                    </form>
                                </Container>
                            </ModalBody>
                        </Modal>
                        <ItemList items={this.props.items} onEdit={this.onEdit} />
                        </Col>
                </Row>
            </Container>
        );
    }
}

export default Item;