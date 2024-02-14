import React from "react";
import CodeBlockItem from "../CodeBlockItem/CodeBlockItem";

const CodeBlockList = ({ codeblocks }) => {
        return ( 
            <div>
                <h2>Choose code block</h2>
                {
                    codeblocks.map(({ id, title, code }) => {
                        return (
                        <CodeBlockItem
                            key={id}
                            id={id}
                            title={title} 
                            code={code}/>
                        );    
                    })
                }
            </div>
        );
}

export default CodeBlockList;