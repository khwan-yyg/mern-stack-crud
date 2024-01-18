import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import DetailPage from "./components/DetailPage";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/posts/:id" element={<DetailPage />} />
            <Route path="/add" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;