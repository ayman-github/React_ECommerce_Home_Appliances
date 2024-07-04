import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

import Input from "../ui/Input";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRegister } from "../../services/api/useUsers";
import { getError } from "../../utils/error";
import { ApiError } from "../../types/ApiError";
import { MdEmail } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";
import { Button } from "../ui/Button";

export default function RegisterModel({ setOpen } : {setOpen: Dispatch<SetStateAction<boolean>>}) {

  const regInfos = {
    fullName: "",
    email: "",
    password: "",
  };

  const [reg, setReg] = useState(regInfos);

  const {
    mutateAsync: registerMutate,
    isPending,
    error,
    isError,
    isSuccess
  } = useRegister();

  const { 
    fullName,
    email,
    password,
  } = reg;

  const handleRegChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReg({ ...reg, [name]: value });
  };

  const regValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string().required("Password is required"),
    fullName: Yup.string()
      .min(6, "Name must be at least 6 characters.")
      .max(35, "Name can't be more than 35 characters."),
  });

  if(isSuccess){
    setOpen(false);
  }

  const submit = async () => {
    try {

        registerMutate({
            fullName: fullName,
            email: email,
            password: password,
        });

    } catch (error) {
        console.log(getError(error as ApiError));
    }
  }

  return (

     <div className="absolute z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

      <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity">  </div>
       
        <div className="fixed inset-0 min-h-full justify-center p-4 text-center sm:items-center sm:p-0">

          <div className="relative top-10 left-[50%] -translate-x-[50%] transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            
            <div className="w-full bg-gray-400 px-4 pt-5 pb-4 flex items-center justify-center text-xl font-bold">
                  Register
            </div>

            <div className="pb-2 bg-white p-4 z-20">
        
            <Formik 
                enableReinitialize 
                initialValues= {regInfos}
                validationSchema={regValidation}

                onSubmit={() => {
                  submit();
                }} >
                
                  <Form>
                    <Input
                      type="text"
                      name="fullName"
                      label="Full Name"
                      icon= {<MdEmail />}
                      placeholder="Full Name"
                      onInput={handleRegChange}
                    />
                    <Input
                      type="text"
                      name="email"
                      label="Email"
                      icon= {<MdEmail />}
                      placeholder={"Email address"}
                      onInput={handleRegChange}
                    />
                    <Input
                      type="password"
                      name="password"
                      label="Password"
                      icon= {<HiLockClosed  />}
                      placeholder={"Password"}
                      onInput={handleRegChange}                      
                    />

                    {isError && <div className="text-red-600 max-w-fit">{getError(error as ApiError)}</div>}
                    {/* {isPending && <div className="text-red-600 max-w-fit">{'loading ... '}</div>} */}

                </Form>
        
              </Formik>

             </div>

            <div className="bg-gray-400 p-4 flex gap-2 w-full justify-end">

              <div className="w-40">
                <Button title="Register" variant={'primary'}
                    isLoading= {isPending} onClick={submit}/>
              </div>

              <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={()=>setOpen(()=>false)}
                >Cancel</button>

            </div>
          </div>
        </div>
             
    </div>
  )
}