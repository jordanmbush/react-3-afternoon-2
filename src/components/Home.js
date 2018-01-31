import React, { Component } from 'react';
import Hero from './subcomponents/Hero';
import BlogThumb from './subcomponents/BlogThumb';

// import axios
import axios from 'axios';


class Home extends Component{
    constructor(){
        super();
        this.state = {
            featured: '',
            index: 0,
            posts: [{title: "Loading...",image: 'https://unsplash.it/900/400/?random'}]
        }
    }

    // insert componentWillMount:
    componentWillMount(){
        axios.get('/api/featured').then(results=>{
            this.setState({
                featured: results.data,
                index: (~~(Math.random() * results.data.length) + 0),
                posts: results.data
            })
        }).catch(console.log)   
    }

    render(){
        // map over your recommended blogs here, replace null.
        const posts = this.state.posts.map( (post, i) => {
            return <BlogThumb key={i} blog={post} />;
        })

        return(
            <div className="content" >
                <Hero blog={this.state.posts[this.state.index]} />
                <hr/>
                <div className="blog-grid">
                    {posts}
                </div>
            </div>
        )
    }
}

export default Home;