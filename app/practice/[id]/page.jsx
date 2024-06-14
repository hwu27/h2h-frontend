// practice.jsx
import React, { useRef, useEffect, useState } from 'react';
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import Header from '@/app/components/Header';
import withAuth from '@/app/hoc/withAuth';
import { doc } from 'firebase/firestore';

function Practice() { 

  const [modelResponse, setModelResponse] = useState([]);
  const [docResponse, setDocResponse] = useState([]);
  const [inputText, setInputText] = useState('');

  const combined = docResponse.flatMap((item, index) => [item, modelResponse[index]]);
  const lastItemRef = useRef(null);
  useEffect (() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({behavior: "smooth"});
    }
  }, [docResponse]);

  {/* Set input dynamically */}
  const handleResponseChange = (event) => {
    setInputText(event.target.value);
    console.log('Input text: ', event.target.value);
  };

  {/* Handle enter key press */}
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setDocResponse([...docResponse, inputText]);
      setInputText('');
    }
  };

  const practiceRef = useRef(null);
  useEffect(() => {
    if (practiceRef.current) {
      practiceRef.current.scrollIntoView();
    }
  }, []);
  
  const [minimizeText, setMinimizeText] = useState(false)
  const minimize = () => {
    setMinimizeText(!minimizeText)
  }

  return ( 
  <> 
    <Header />
    <main ref={practiceRef} className='flex flex-col items-center justify-center h-screen-full w-full p-4'>
    <div className={`flex flex-col justify-between border-2 ${minimizeText ? 'h-full rounded-b-3xl' : 'h-4/6'} w-8/12 p-4 rounded-t-3xl`}>
      <div></div> {/* This empty div will take up the top space */}
      {!minimizeText ? <FaArrowDown className='text-xl m-2 hover:text-gray-200 cursor-pointer' onClick={minimize}/> : <FaArrowUp className='text-xl m-2 hover:text-gray-200 cursor-pointer' onClick={minimize}/>}
    </div>
      {!minimizeText && <div className='flex flex-col items-center border-2 h-2/6 w-8/12 p-4 rounded-b-3xl'>
        <div className='border-2 rounded-t-3xl h-5/6 w-11/12 overflow-y-auto'>
          <div className="mx-10 mt-8">
            {
              combined.map((item, index) => {
                if (index % 2 === 0) {
                  return (
                    <div className="flex flex-col" key={index}>
                      <span className="flex items-center"><h2 className="mb-2 font-bold">Doctor(You)</h2></span>
                      <p className="mb-6">{item}</p>
                    </div>
                  );
                } else {
                  return (
                    <div className="flex flex-col items-end" key={index} ref={index === combined.length - 1 ? lastItemRef : null}>
                      <span className="flex items-center"><h2 className="mb-2 font-bold">Relative/Friend</h2></span>
                      <p className="mb-6">{item}</p>
                    </div>
                  );
                }
              })
            }
          </div>
        </div>
        <input className='border-2 rounded-b-3xl h-1/6 w-11/12 p-4' value={inputText} onChange={handleResponseChange} onKeyDown={handleKeyPress}>
        </input>
      </div>}
    </main>
  </>
  )
}

export default withAuth(Practice, 'practice');

