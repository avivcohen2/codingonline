import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import hljs from 'highlight.js';
import './CodeBlockPage.css';
import 'highlight.js/styles/dark.css';
import io from 'socket.io-client'

const CodeBlockPage = ({ codeblocks }) => {
    console.log('in codeblockpage:', codeblocks)
    const textareaRef = useRef();
    const [editMode, setEditMode] = useState(false); // editMode = true only if you are a student
    const [socket, setSocket] = useState(null);
    let { id } = useParams();
    const curCodeBlock = codeblocks?.find((codeblock) => codeblock?.id === +id);
    let [curSolution, setCurSolution] = useState(curCodeBlock?.code);

    useEffect(() => {
        console.log('new connection')
        hljs.highlightElement(textareaRef.current);

        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
          };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('connect', () => {
                console.log('client connection to:', curCodeBlock?.id)
                socket.emit('codeblockNumConnection', curCodeBlock?.id)
            });

            socket.on('role', (role) => {
                if (role === 'student') {
                    console.log('student logged in');
                    setEditMode(true);
                }
            });

            socket.on('solution', (solution) => {
                setCurSolution(solution);
            })
        }
    }, [socket]);

    function handleCodeChange(event) {
        socket.emit('solution', event.target.value);
    }

    window.addEventListener('DOMContentLoaded', () => {
        const textarea = document.getElementById('myTextarea');
        const container = document.getElementById('container');
        
        function adjustCols() {
          const containerWidth = container.clientWidth;
          const textareaWidth = textarea.scrollWidth;
          const cols = Math.floor(containerWidth / (textareaWidth / textarea.cols));
          textarea.cols = cols;
        }
      
        window.onresize = adjustCols;
        
        adjustCols(); // initial adjustment
      });

    return (
        <div id='container' className='container bg-light-gray br3 ma3 bw2 shadow-5 pa3 w-90-l tc justify-center'>
            <h2>{curCodeBlock?.title}</h2>
                <label>
                <textarea id='myTextarea' className='resizable-textarea'
                ref={textareaRef}
                value={curSolution}
                onChange={handleCodeChange}
                readOnly={!editMode}
                />
                </label>  
        </div>
    );
}

export default CodeBlockPage;