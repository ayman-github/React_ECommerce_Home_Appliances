import { ChangeEvent, ReactElement }  from 'react';
import { useField } from 'formik';
import { IconBaseProps, /*IconType*/ } from 'react-icons';

import { TiDelete } from "react-icons/ti";

interface IInput {
    name: string,
    type: string,
    label: string,
    placeholder: string,
    className?: string,
    icon?: ReactElement<IconBaseProps>,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void,
    onInput?: (e: ChangeEvent<HTMLInputElement>) => void,
}

export default function Input ({ icon, placeholder, label, ...props }: IInput)  {
  const [field, meta] = useField(props);
  return (
    <div className="w-full gap-2 mb-2 border-solid border-gray-500 border-[1px] rounded-md">

    {/* dark:border-solid dark:border-[1px] dark:border-gray-500" */}

      {/* <input 
          className="flex items-end gap-2 h-14 pl-10 w-full outline-none border-solid rounded-md 
            bg-element-100 mb-4 text-black
            dark:bg-element-200 dark:text-element-100
            hover:dark:border-solid hover:dark:border-[2px] hover:dark:border-sky-600
            focus:dark:border-solid focus:dark:border-[2px] focus:dark:border-sky-600
            "
         {...field}
         {...props} 
      /> */}
      <div className={` relative flex-col items-center rounded-md h-14 text-sm py-1.5
               text-black dark:text-white
               bg-white dark:bg-gray-800 
                hover:ring-[3px] hover:ring-[#2f03f2]
                focus:ring-[3px] focus:ring-[#2f03f2]
                active:ring-[3px] active:ring-[#2f03f2]
                ${meta.error ? "ring-2 ring-red-500" : ""}
              `}>

          <div className="absolute text-xl px-2.5 top-7 right-0
            text-gray-600 dark:text-gray-500">
            { <TiDelete  className='hover:text-gray-300'/> }  
          </div>
          { icon && 
              <div className={`absolute text-xl top-7 left-3
                text-gray-600 
                ${meta.error ? "text-red-500" : "dark:text-gray-300"}
                
                `}>
                { icon }  
              </div>
          }

          {meta.touched && meta.error ? (
              <div className="absolute bg-red-700 top-0 left-[50%] -translate-x-[50%] py-[2px] px-2 rounded-b-md w-fit dark:text-white">
                  { meta.error} 
              </div>
            ) : null}

          <div className='px-3 h-fit flex justify-start'> {label} </div>
          <input 
              className={`flex items-center pt-[2px] gap-2 h-fit pl-10 outline-none border-solid rounded-md text-sm
                text-black w-full pr-8
                 bg-white dark:bg-gray-800
                placeholder-bg-white 
                  ${meta.error ? "dark:text-red-500" : "dark:text-gray-300"}`}
                placeholder={placeholder}
            {...field}
            {...props} 
          />
      </div>

      {/* <InputNext
        className="w-full hover:ring-1 rounded-lg hover:ring-focus hover:ring-offset-2 dark:hover:bg-focus active:bg-focus dark:active:bg-focus"
        {...field}
        {...props} 

      /> */}

      {/* {meta.touched && meta.error ? (
        <div className="absolute bg-red-600 p-2 left-5 rounded-lg w-1/4">
            { meta.error} 
        </div>
      ) : null} */}

    </div>
  );
}

