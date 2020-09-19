import React from 'react';
import './Header.css';
import logo from "./header.png";
import { MDBBtn } from 'mdbreact';
import {Link} from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to={"/"}>
        <div>
            <img src = {logo} alt = "myDiary"/>
        </div>
        </Link>

        <Link to={"/addStory"}>
        <MDBBtn outline color="light-green"> New Story</MDBBtn>
        </Link>
    </header>
  
  );
}

export default Header;
