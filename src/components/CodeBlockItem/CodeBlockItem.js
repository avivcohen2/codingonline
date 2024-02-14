import React from 'react';
import { useNavigate } from 'react-router-dom';


const CodeBlockItem = ({ id, title, code }) => {
    const navigate = useNavigate();
    return (
        <div className='bg-light-green dib br3 ma2 grow bw2 shadow-5 pa2' onClick={() => navigate(`/codeblock/${id}`)}>
            <p>{title}</p>
        </div>
    );
}

export default CodeBlockItem;
