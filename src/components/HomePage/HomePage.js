import React from 'react';
import CodeBlockList from '../CodeBlockList/CodeBlockList';

const HomePage = ({ codeblocks }) => {
    return (
        <div className="tc">
            <h1 className="f1">CodingOnline</h1>
            <CodeBlockList codeblocks={codeblocks}/>
          </div>
    );
}

export default HomePage;     
