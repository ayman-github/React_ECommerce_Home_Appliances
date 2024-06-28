import { useContext, useEffect } from "react";
import { Store } from "./AppStateContext";

import { MdSunny, MdModeNight } from "react-icons/md";


export default function AppTheme() {
    const { state: { mode }, dispatch } = useContext(Store);

    useEffect(() => {
        const className = "dark";
        const bodyClass = window.document.body.classList;

        mode === "dark"
            ? bodyClass.add(className)
            : bodyClass.remove(className);
    }, [mode]);

    const switchTheme = () => {
        dispatch({ type: 'SWITCH_MODE' });    
    }

  return (
    <button className="text-xl"
        onClick={switchTheme}>
          {
            mode === "dark" 
            ? <MdModeNight /> 
            : <MdSunny />
          }         
    </button>
  )
}


