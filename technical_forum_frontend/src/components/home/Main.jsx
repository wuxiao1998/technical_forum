import React from 'react'




class Main extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }


    render(){
        console.log(this.props,1234)
        return <div>
          这是主页
        </div>
    }
}

export default Main