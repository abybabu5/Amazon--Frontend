import React, {Component} from 'react'
import moment from "moment";
import StarRatingComponent from "react-star-rating-component";
import {Api} from "./Api";

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: "",
            rating: 5,
            comment: {
                rate: "",
                message: ""
            }
        };
        // bind context to methods
        this.deleteComment = this.deleteComment.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.editComment = this.editComment.bind(this);
    }

    /**
     * Handle form input field changes & update the state
     */
    handleFieldChange = event => {
        const {value, name} = event.target;

        this.setState({
            ...this.state,
            comment: {
                ...this.state.comment,
                [name]: value
            }
        });
    };

    refreshData() {
        Api.fetch('/reviews/' + this.props.id, 'GET').then(res => {
            let avgRate = 0;
            if (res) {
                res.forEach(c => (avgRate += c.rate));
            }
            avgRate = avgRate / res.length;
            this.setState({comments: res, avgRate});
        });
    }

    componentDidMount() {
        this.refreshData();
    }

    /**
     * Form submit handler
     */
    onSubmit(e) {
        // prevent default form submission
        e.preventDefault();
        const data = {
            comment: this.state.comment.message,
            rate: this.state.rating,
            productId: this.props.id
        };
        console.log(data);
        if (this.state.comment._id) {
       Api.fetch('/reviews/' + this.state.comment._id, 'PUT', data).then(r => {
                console.log(r);
                this.refreshData();
                this.setState({ comment: {
                        rate: "",
                        message: ""
                    }});
            });
        } else {
           Api.fetch('/reviews/', 'POST', data).then(r => {
                console.log(r);
                this.refreshData();
                this.setState({ comment: {
                        rate: "",
                        message: ""
                    }});
            });
        }
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    renderError() {
        return this.state.error ? (
            <div className="alert alert-danger">{this.state.error}</div>
        ) : null;
    }

    deleteComment(id) {
        console.log(id.currentTarget.name);
     Api.fetch('/reviews/' + id.currentTarget.name, 'DELETE').then(result => {
            console.log(result);
            this.refreshData();
        });

    }

    editComment(id) {
        const c = this.state.comments.find((comment) => id.currentTarget.name === comment._id);
        if (c) {
            const editComment = JSON.parse(JSON.stringify(c));
            editComment.message = editComment.comment;
            this.setState({ comment: editComment, rating: editComment.rate});
        }

    }

    render() {
        return (
            <div style={{'margin-top': '10px'}}>
                {this.state.comments &&
                this.state.comments.map(comment => (
                    <div key={comment._id} style={{'border': 'solid 1px black', 'border-radius': '5px'}}>
                        <div>
                            {comment.author} commented {moment(comment.createdAt).fromNow()}
                        </div>

                        <div>{comment.comment}</div>
                        <div>
                            <StarRatingComponent starCount={5} name={comment._id} value={comment.rate}/>
                        </div>
                        <button className={'btn btn-sm'} name={comment._id} onClick={this.editComment}><i
                            className="material-icons">edit</i></button>
                        <button className={'btn btn-sm'} name={comment._id} onClick={this.deleteComment}><i
                            className="material-icons">delete</i></button>
                    </div>
                ))}
                <div style={{'margin-top': '10px'}}>
                    <h5>Overall rating:</h5>
                    <StarRatingComponent
                        name="rate1"
                        starCount={5}
                        value={this.state.avgRate}
                        onStarClick={this.onStarClick.bind(this)}
                    />
                </div>
                <hr/>
                <div>
                    <h4>Write a comment:</h4>
                    <StarRatingComponent
                        name="rate1"
                        starCount={5}
                        value={this.state.rating}
                        onStarClick={this.onStarClick.bind(this)}
                    />
                    <form method="post" onSubmit={this.onSubmit}>
                        <div className="form-group">
              <textarea
                  onChange={this.handleFieldChange}
                  value={this.state.comment.message}
                  className="form-control"
                  placeholder="🤬 Your Comment"
                  name="message"
                  rows="5"
              />
                        </div>

                        {this.renderError()}

                        <div className="form-group">
                            <button
                                onClick={this.onSubmit}
                                disabled={this.state.loading}
                                className="btn btn-primary"
                            >
                                Comment ➤
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default Review;