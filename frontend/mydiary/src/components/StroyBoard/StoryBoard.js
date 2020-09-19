import React, {Component} from 'react';
import './StoryBoard.css';
import Story from "../Story/Story";
import axios from 'axios';

class StoryBoard extends Component {
    constructor(props){
        super()
        this.state={
            stories :[]
        };
    }
    componentDidMount(){
        axios.get('/api/getStories')
        .then(res=> {
            const stories = res.data;
            this.setState({stories});
            console.log(stories);
        })
    }

    render(){
        if(this.state.stories){
        const stories = this.state.stories.map((x,i)=><Story key={i} id={x.story_id} title={x.title} description={x.description} image={x.image}/>)
        return(
            <div className="story_board">
          {stories}
            </div>
        );}
        else
        return(<div>loading...</div>)
    }
}

export default StoryBoard;
