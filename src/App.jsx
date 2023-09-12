import { useState,useCallback ,useEffect,useRef} from 'react'



function App() {
  const [length,setLength]=useState(8)
  const[numberAllowed,setNumberAllowed]=useState(false);
  const[charAllowed,setCharAllowed]=useState(false);
  const[Password,setPassword]=useState("")
//use ref hook
const passwordRef=useRef(null)
  const passwordGenerator= useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*-_+=[]{}~`"


    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass +=str.charAt(char)
    }

    setPassword(pass)

  }, [length,numberAllowed,setCharAllowed,setPassword])
 const copyPasswordToClipboard=useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,29);
  window.navigator.clipboard.writeText(Password)
 },[Password])

  useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
      
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-white-500 bg-gray-100'>
      <h1 className='text-4xl text-center text-grey my-3'>Password generator</h1>
        <div className='className=" flex shadow rounded-lg overflow-hidden mb-4"'>
          <input 
          type="text"
          value={Password} 
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
            <button
            onClick={copyPasswordToClipboard}
             className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
          <input
             type="range"
             min={6}
             max={100}
             value={length}
             className='cursor-pointer'  
             onChange={(e)=>{setLength(e.target.value)}}          
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input
               type="checkbox"
               defaultChecked={numberAllowed}
               id="numberInput" 
               onChange={()=>{
                setNumberAllowed((preview)=>!preview);
            }}          
            />
            <label htmlFor="numberInput">Numbers</label>
            </div>
          <div className='flex items-center gap-x-1'>
          <input
               type="checkbox"
               defaultChecked={charAllowed}
               id="characterInput" 
               onChange={()=>{
                setCharAllowed((preview)=>!preview);
            }}          
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
