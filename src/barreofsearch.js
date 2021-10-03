import React, { Component } from 'react';

class barreofsearch extends Component {
    render(){
        return(
          <div className="search-box">
             <button class="btn-search"><i class="fas fa-search"></i></button>
             <input type="text" class="input-search" placeholder="Type to Search..."></input>
          </div>
        )
      }
}

  
export default barreofsearch;