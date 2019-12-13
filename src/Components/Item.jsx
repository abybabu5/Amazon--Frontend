import React from 'react';
import {Row, Col,Container} from 'reactstrap';
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


class Item extends React.Component {
    state = {modal: false};
    onFormSubmit = (e) => {
        if (this.state._id) {
            Api.fetch("/items/" + this.state._id, "PUT", this.state).then(res => {
                console.log("edit", res);
                this.props.refresh();
            });

        } else {
            Api.fetch("/items", "POST", this.state).then(res => {
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
        return !(this.state.itemName && this.state.itemDescription);
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
                            <button className="btn btn-primary" onClick={this.toggle}><i
                                className="far fa-edit" id="newsfeedPencil"></i> Add Items
                            </button>
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader className="modalHeaderNfModal" toggle={this.toggle}>Enter Item
                                Details</ModalHeader>
                            <ModalBody>
                                <Container className={'studentForm'}>

                                    <form autoComplete="off" id="form">
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Name</label>
                                                <input type="text" className="form-control" id="itemName" placeholder="Item Name"
                                                       defaultValue={this.state.itemName}
                                                       onChange={this.updateForm}/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Description</label>
                                                <input type="text" className="form-control" id="itemDescription"
                                                       placeholder="Item Description" defaultValue={this.state.itemDescription}
                                                       onChange={this.updateForm}/>
                                            </div>

                                        </div>
                                        <div className="form-group">
                                            <label>Brand</label>
                                            <input type="text" className="form-control" id="itemBrand"
                                                   placeholder="Item Brand" onChange={this.updateForm}
                                                   defaultValue={this.state.itemBrand}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Price</label>
                                            <input type="number" className="form-control" id="itemPrice"
                                                   placeholder="$" onChange={this.updateForm}
                                                   defaultValue={this.state.itemPrice}/>
                                        </div>
                                        <div className="form-group">
                                            <label>Category </label>
                                            <input type="text" name="category" id="itemCategory"
                                                placeholder="date placeholder" onChange={this.updateForm}
                                                defaultValue={this.state.itemCategory}
                                            />

                                        </div>
                                    <div>
                                        <label>Image URL</label>
                                        <textarea  className="form-control" id="picture"

                                                   defaultValue={this.state.picture}
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
                        </Col>
                </Row>
            </Container>
        );
    }
}

export default Item;