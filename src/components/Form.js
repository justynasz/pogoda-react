import React from 'react';

const Form = props => {
    return (
        <form>
            <input
                type="text"
                value={props.newcity}
                placeholder="wpisz miasto"
                onChange={props.change}
            />
        </form>
    );
}

export default Form;