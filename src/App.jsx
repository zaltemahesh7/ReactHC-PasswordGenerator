import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(5);
  const [numAllow, setNumAllow] = useState(false);
  const [speChar, setSpeChar] = useState(false);
  const [password, setPassword] = useState("");

  // useRef Hook :- It gives an refference to 

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllow) str += "0123456789";
    if (speChar) str += "`~!@#$%^&*(){}[]':;<>?";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllow, speChar, setPassword]);

  const copyPasswordToClipbord = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => { passwordGenerator() }, [length, numAllow, speChar, setPassword])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-center text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            name="pass"
            type="text"
            value={password}
            className="w-full outline-none py-1 px-3"
            placeholder={length}
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:scale-105"
            onClick={copyPasswordToClipbord}
          >
            Copy
          </button>
        </div>
        <div className="flex gap-2">
          <div className=" flex gap-x-1">
            <input
              type="range"
              id="vol"
              name="vol"
              min={5}
              max={50}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="vol">Length: {length - 1}</label>
          </div>
          <div className=" flex gap-x-1">
            <input type="checkbox" id="vehicle1" name="vehicle1" onChange={() => setSpeChar((prev) => !prev)} />
            <label htmlFor="vehicle1"> speChar</label>
          </div>
          <div className=" flex gap-x-1">
            <input type="checkbox" id="vehicle2" name="vehicle1" onChange={() => setNumAllow((prev) => !prev)} />
            <label htmlFor="vehicle1"> numAllow</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
