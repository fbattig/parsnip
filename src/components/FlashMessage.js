import React from 'react';

const FlashMessage = (props) => {
    return (
        <div className='flash-error' >
            {props.message}
        </div>
    );
};

Error.defaultProps = {
    message: 'An error occured'
};

export default FlashMessage ;