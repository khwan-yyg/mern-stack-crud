import React, { Component } from 'react'
import Axios from "axios";
import { setErrors } from "../common/setErrors"
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class EditPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            category: "",
            errors: {},
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        Axios.get(`/posts/detail/${id}`).then((res) => {
            if (res.data.success) {
                this.setState({
                    title: res.data.post.title,
                    description: res.data.post.description,
                    category: res.data.post.postCategory,
                });
            }
        });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            [name]: value,
        });
    };

    validate = (titlte, description, category) => {
        const errors = setErrors(titlte, description, category);
        this.setState({ errors: errors });
        return Object.values(errors).every((err) => err === "");
    };

    onSubmit = (e) => {
        e.preventDefault();
        const id = this.props.match.params.id;
        const { title, description, category } = this.state;
        if (this.validate(title, description, category)) {
            const data = {
                title: title,
                description: description,
                postCategory: category,
            };
            console.log(data);
            Axios.put(`/posts/update/${id}`, data).then((res) => {
                if (res.data.success) {
                    alert("Edited successfully");
                    window.location.href = "/#"
                }
            });
        }
    };

    render() {
        return (
            <div className="">
                <a href="/#" className="link-danger mt-5 ps-2"><h6><i className='bx bxs-chevrons-left'></i> Back</h6></a>
                <h2 className="ps-2">Edit post</h2>

                <hr />

                <div className="col-md px-2 mt-3">
                    <form className="needs-validation" noValidate>
                        <div className="form-group">
                            <label className='mb-1'>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                placeholder="Enter title"
                                value={this.state.title}
                                onChange={this.handleInputChange}
                            />
                            {this.state.errors.title && (
                                <div className="text-danger">{this.state.errors.title}</div>
                            )}
                        </div>

                        <div className="form-group mt-3">
                            <label className='mb-1'>Category</label>
                            <input
                                type="text"
                                className="form-control"
                                name="category"
                                placeholder="Enter category"
                                value={this.state.category}
                                onChange={this.handleInputChange}
                            />
                            {this.state.errors.category && (
                                <div className="text-danger">{this.state.errors.category}</div>
                            )}
                        </div>

                        <div className="form-group my-3">
                            <label className='mb-1'>Description</label>
                            <CKEditor
                                editor={ClassicEditor}
                                config={{
                                    toolbar: ["undo", "redo", "bold", "italic", "blockQuote", '|', "heading", "link", "numberedList", "bulletedList"],
                                    shouldNotGroupWhenFull: true
                                }}
                                data={this.state.description}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    this.setState({ description: data });
                                }}
                            />
                            {this.state.errors.description && (
                                <div className="text-danger">{this.state.errors.description}</div>
                            )}
                        </div>

                        <button
                            className="btn btn-success"
                            type="submit"
                            onClick={this.onSubmit}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditPost
