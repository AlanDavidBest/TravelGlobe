
import { useEffect, useState } from "react";
export const useInputEvent = () => {
  const [key, setKey] = useState(null);
  useEffect(() => {
    const keyDownHandler = ({ code }) => setKey(code);
    const keyUpHandler = () => setKey(null);
    global.addEventListener('keydown', keyDownHandler);
    global.addEventListener('keyup', keyUpHandler);
    return () => {
      global.removeEventListener("keydown", keyDownHandler);
      global.removeEventListener("keyup", keyUpHandler)
    }
  }, []);
  return key;
}
//https://gist.github.com/joelnet/6bb17b8b49980a48a390578a9294d26f#file-useinputevent-js