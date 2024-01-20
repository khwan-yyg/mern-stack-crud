import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-3 mb-3">
                    <div className="navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item me-3">
                                <a className="nav-link active" href="/#">MERN Stack app</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/#">All Post</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;