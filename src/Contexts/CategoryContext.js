import React from 'react';

const Context = React.createContext({
    state:{}
    , actions:{}
});

const {Provider, Consumer: CategoryConsumer} = Context;

export class CategoryProvider extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            category: props.default
        };
    }

    actions = {
        change:() => {}        
    }
       
    render () {
        const {state, actions} = this;
        const value = {state, actions};
        return (
            <Provider value={value}>
            {this.props.children}
            </Provider>
        )
    }
}

export function withCategory(WrappedComponent){
    return (props)=>{
        return (
            <CategoryConsumer>
            {({state, actions})=>( 
                <WrappedComponent
                {...props}
                {...state}
                {...actions}
                />
            )}
            </CategoryConsumer>
        )
    }
}