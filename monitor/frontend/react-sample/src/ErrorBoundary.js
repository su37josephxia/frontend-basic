import React from 'react'; 
export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
    }
  
    componentDidCatch(error, info) {
      console.log('componentDidCatch',error)
    }
  
    render() {
      return this.props.children;
    }
  }