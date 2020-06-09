import React from 'react';
import { Route, withRouter } from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";

const style = {
    root: ''
}

class Home extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>home page</div>
        )
    }
}

export default withRouter(withStyles(style)(Home))