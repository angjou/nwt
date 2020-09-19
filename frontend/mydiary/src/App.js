import React from 'react';
import './App.css';
import { BrowserRouter as Router , Route } from "react-router-dom";
import Header from "../src/components/Header/Header";
import StoryBoard from "../src/components/StroyBoard/StoryBoard";
import AddStory from '../src/components/AddStory/AddStory';

function App() {
  return (

   <Router>
    <Header/>
    <Route path="/" exact component = {StoryBoard}/>
    <Route path="/addStory" component= {AddStory}/>
   </Router>
  );
}

export default App;
