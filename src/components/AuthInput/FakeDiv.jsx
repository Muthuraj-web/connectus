import React, { Component } from 'react';
import Input from './Input'
class FakeDiv extends Component {
    render() {
        const value = this.props.value.slice(0,this.props.value.length - 1)
        return (
            <React.Fragment>
            <span className="m-0 mt-2 pl-2 d-block" htmlFor={this.props.name}><b><i>{this.props.name}</i></b></span>
            <div className="p-1 auth-input pb-2  rounded">                
                {
                    value.map(each=><span className="pl-1 pr-1 mr-1 float-left bg-success border-success rounded-pill">{each}</span>)
                }
                <Input inline {...this.props} value={this.props.value[this.props.value.length - 1]}/>
            </div>
            </React.Fragment>
        );
    }
}

export default FakeDiv;