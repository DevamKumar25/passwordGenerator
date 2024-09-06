import { useState ,useCallback, useEffect, useRef} from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numbers, setNumbers] = useState(false);
  const [characterAllowed, setcharacterAllowed] = useState(false);
  const [password,setPassword] = useState("")

  // useRef hook
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass ="";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbers) str+= "0123456789"
    if(characterAllowed) str+= "!@#$%^&*(){}[]~"


    for(let i=1;i<= length;i++){
      let char = Math.floor(Math.random()*str.length+1)
//  comes in string and we choose character with help of charAt
      pass += str.charAt(char)
    }

    setPassword(pass)
  },[length,numbers,characterAllowed,setPassword])


  const copuPasswordClipBoard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3)   for selecting only 3 value 
    window.navigator.clipboard.writeText(password)
  },[password])

useEffect(() => {
  passwordGenerator()
},[length,numbers,characterAllowed,
  passwordGenerator])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md
      rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-500' text-orange-500>
        <h1 className='text-2xl text-center my-3 text-white'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <button
          onClick={copuPasswordClipBoard}
          className='outline-none bg-blue-700 text-white
          px-3 py-2 shrink-0 hover:bg-cyan-600'
          >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-4'>
            <input type="range"
            min = {6}
            max = {100}
            value = {length}
             className='cursor-pointer'
             onChange={(e) => {setLength(e.target.value)}}
             />
             <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={numbers}
            id="numberInput"
            onChange={() => {
              setNumbers((prev) => !prev);
            }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={characterAllowed}
            id="characterInput"
            onChange={() => {
              setcharacterAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="characterInput">Character</label>
          </div>


        </div>
      </div>
    </>
  )
}

export default App
