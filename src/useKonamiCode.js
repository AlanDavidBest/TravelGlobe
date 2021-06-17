import { useEffect, useState } from "react";
import { useInputEvent } from "./useInputEvent";

const konamiCode = [ "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "KeyB", "KeyA",];

export const useKonamiCode = () => {
  const [count, setCount] = useState(0);
  const [success, setSuccess] = useState(false);
  const key = useInputEvent();
  
  useEffect(() => {
    if (key == null) return;
    if (key !== konamiCode[count]) {
      setCount(0);
      return;
    }
  
    setCount((state) => state + 1);
    if (count + 1 === konamiCode.length) {
      setSuccess(true);
    }
  }, [key]);
  
  return success;
};

//https://gist.github.com/joelnet/b5dde8b4ac76c77d741235f15a94937d#file-usekonamicode-js