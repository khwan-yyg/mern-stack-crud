import React, { Component } from "react";
import axios from "axios";

class DetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
        };
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`https://mern-stack-crud-and-search-app.vercel.app/posts/detail/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    post: res.data.post,
                });
                console.log("post: ", this.state.post);
            }
        });
    }
    render() {
        const { title, postCategory, description } = this.state.post;
        return (
            <div className="ps-2 mt-5">
                <h2> Detail post : {title}</h2 >

                <hr />

                <dl className="row">
                    <dt className="col-sm-2">Title :</dt>
                    <dd className="col-sm-10">{title}</dd>

                    <dt className="col-sm-2">Category :</dt>
                    <dd className="col-sm-10">{postCategory}</dd>

                    <dt className="col-sm-2">Description :</dt>
                    <dd className="col-sm-10">
                        <p dangerouslySetInnerHTML={{ __html: description }}></p>
                    </dd>
                </dl>

                <a
                    className="btn btn-danger"
                    href="/#"
                >
                    Back
                </a>
            </div >
        );
    }
}

export default DetailPage;