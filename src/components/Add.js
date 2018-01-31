import React, {Component} from 'react';
import ConfirmModal from './subcomponents/ConfirmModal';
import axios from 'axios';
// import axios

class Add extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            subTitle:'',
            image:'',
            text:'',
            confirm: ''
        }
        this.yes = this.yes.bind(this);
        this.no = this.no.bind(this);

    }

    // insert post function
    post() {
        const body = {
            title: this.state.title,
            subTitle: this.state.subTitle,
            image: this.state.image,
            text: this.state.text
        } 

        axios.post('/api/blogs', body).then( response => {
            this.props.history.push(`/blog/${response.data.id}`);
        })
    }
    
    render() {
        let {title, subTitle, image, text} = this.state;
        return (
            <div className='content'>
                <div className="add-blog">
                    <div className="input-group">
                        <label htmlFor="">Title</label>
                        <input value={title} onChange={e=>this.titleChange(e.target.value)} type="text"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Sub-Title</label>
                        <input value={subTitle} onChange={e=>this.subTitleChange(e.target.value)} type="text"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="">Photo Url</label>
                        <input value={image} onChange={e=>this.imageChange(e.target.value)} type="text"/>
                    </div>
                    <div className="input-group text-input">
                        <label htmlFor="">Content</label>
                        <textarea value={text} onChange={e=>this.textChange(e.target.value)} placeholder="Blog here!" />
                    </div>


                    <div className="buttons">
                        <button onClick={_=>this.post()}>Post</button>
                        <button onClick={_=>this.cancel()} className='cancel-button'>Cancel</button>
                    </div>

                    {
                        this.state.confirm
                        ?
                        <ConfirmModal confirm={this.state.confirm} no={this.no} yes={this.yes} />
                        :
                        null
                    }
                </div>
            </div>
        )
    }
    yes(){
        this.setState({
            title: '',
            subTitle: '',
            image: '',
            text: '',
            confirm: ''
        })
    }
    no(){
        this.setState({
            confirm: ''
        })
    }
    cancel(){
        this.setState({
            confirm: 'discard'
        })
    }
    titleChange(val){
        this.setState({
            title: val
        })
    }
    subTitleChange(val){
        this.setState({
            subTitle: val
        })
    }
    imageChange(val){
        this.setState({
            image: val
        })
    }
    textChange(val){
        this.setState({
            text: val
        })
    }
}

export default Add;