import React from 'react';

const Context = React.createContext({
    state:{}
    , actions:{}
});

const {Provider, Consumer: DataConsumer} = Context;

export class DataAccessProvider extends React.Component{
    constructor(props){
        super(props)
    }

    actions = {
        get: ()=>{
            

        },
        post: ()=>{
            

        }
    }
       
    render () {
        const {state, actions} = this;
        const value = {state, actions};
        const child = this.props.children
        return (
            <Provider value={value}>
            {child}
            </Provider>
        )
    }
}

export function withDataAccess(WrappedComponent){
    return (props)=>{
        return (
            <DataConsumer>
            {({state, actions})=>( 
                <WrappedComponent
                {...props}
                {...state}
                {...actions}
                />
            )}
            </DataConsumer>
        )
    }
}