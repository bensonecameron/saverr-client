//FetchDisplay.js is an example of a funtional component. Notice there are no state changes in this file.

import React from 'react';

let FetchDisplay = props => {
    return(
        <div>
            <img src={props.url} alt="doggo" />
        </div>
    )
}

export default FetchDisplay;