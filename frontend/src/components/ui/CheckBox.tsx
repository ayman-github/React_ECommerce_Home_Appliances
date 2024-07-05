import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from "react-icons/md";

 interface CheckboxProps {
    disabled?: boolean;
    defaultChecked?: boolean;
    label: string;
    key: string;
  }
  
  
  export default function CheckBox ({options, setOfState, initOption }:{options: CheckboxProps[], setOfState: Dispatch<SetStateAction<string>>, initOption?: string }) {
    const [selected, setSelected] = useState<string>();

    const selectHandel = (value: string) => {
        setSelected(value);
        setOfState(value);
    }
    
    useEffect(()=>{
        if (initOption != null) {
            setSelected(initOption);
        }
    },[])

    return (
        <>
            {
                options.map((option: CheckboxProps)=>(
                    <div key={option.key} 
                        onClick={()=> selectHandel(option.label)}
                        className='flex gap-1 items-center cursor-default text-lg py-1'
                        >
                        { selected == option.label 
                            ? <MdOutlineRadioButtonChecked /> 
                            : <MdOutlineRadioButtonUnchecked />
                        }
                        {option.label}
                    </div>
                    
                ))
            }
        </>
    )
}