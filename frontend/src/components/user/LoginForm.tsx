
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../ui/Input";
import { ChangeEvent, useContext, useEffect, useState } from "react";
//*import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { MdEmail } from 'react-icons/md';
import { HiLockClosed } from "react-icons/hi";

import { Store } from '../../AppStateContext'
import { useLogin } from "../../services/api/useUsers";
import { ApiError } from "../../types/ApiError";
import { getError } from "../../utils/error";
import { Button } from "../ui/Button";
import RegisterModel from "./RegisterModel";

const loginInfos = {
  email: "",
  password: "",
};

export default function LoginForm() {

    const navigate = useNavigate();

    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [ login, setLogin ] = useState(loginInfos);
    const { email, password } = login;

    const { state: {userInfo}, dispatch } = useContext(Store);

    const [ regModel, setRegModel ] = useState(false);

    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    };

    const loginValidation = Yup.object({
        email: Yup.string()
        .required("Email address is required.")
        .email("Must be a valid email.")
        .max(100),
        password: Yup.string().required("Password is required"),
    });

    const { 
        mutateAsync: loginMutate, 
        data: loginData, 
        isPending, 
        isSuccess, 
        isError, 
        error,
    } = useLogin();

    if (isSuccess) {
        dispatch({ type: 'USER_LOGIN', payload: loginData! });
        localStorage.setItem('userInfo', JSON.stringify(loginData));
        navigate(redirect);
    }

  const loginSubmit = async () => {
    try {
        loginMutate({
            email,
            password,
        });
    
      //Cookies.set("user", JSON.stringify({data: {email: data?.email, fullName: data?.fullName}}));
      //*Cookies.set("user", JSON.stringify({data: data} ));

      //*console.log(loginData);
    } catch (error) { 
      //error.response?.data?.message
      console.log(getError(error as ApiError));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <>
      {
        regModel && <RegisterModel setOpen={setRegModel}/>
      }

      <div className="{LOGIN CONTAINER} grid grid-cols-1 gap-1 md:grid-cols-2">

        <div className="{LOGIN-HEADER} text-center w-full md:mt-40 md:ml-16 m-auto">
          <div className="pb-2 text-5xl font-Lobster text-blue-500">
              <div className="text-8xl mb-4">Home Appliances</div>
              <div> Shopping as Home</div>
          </div>
        </div>

        <div className="{LOGIN-BODY} text-center border-solid border-1 bg-white dark:bg-gray-900
              min-w-max rounded-md shadow-lg p-5 w-[45%] md:mt-40 md:ml-16 m-auto">
          <div className="login_2_wrap">
              <div className="mt-2 mb-6 text-xl font-bold dark:text-gray-300"> Login </div>

            <Formik 
              enableReinitialize 
              initialValues={{ email, password, }}
              validationSchema={loginValidation}
              onSubmit={() => loginSubmit() }
            >
                <Form>
                  <Input
                      type="text"
                      name="email"
                      label="Email"
                      placeholder="Email address"
                      icon= {<MdEmail />}
                      onChange={handleLoginChange} 
                      //bottom="" 
                      />
                  <Input
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Password"
                    onChange={handleLoginChange}
                    //bottom = ""
                    icon= {< HiLockClosed  />}
                  />
                  {/* <button type="submit" className="bg-blue-600 p-2 rounded-md text-slate-100 w-full mb-4 hover:bg-blue-500 h-12 text-lg font-bold"> Login </button> */}
                  <Button type="submit" title="Login" variant={'primary'}
                    isLoading= {isPending} />
                </Form>
            
            </Formik>

            {/* <Link to="/reset" className="forgot_password">
              Forgotten password?
            </Link> */}

            <div className='mx-auto w-8'>
              {/* <DotLoader color="#1876f2" loading={loading} size={30} /> */}
            </div>

            {isError && <div className="text-red-600 max-w-fit">{getError(error as ApiError)}</div>}
            {/* {isPending && <div className="text-red-600 max-w-fit">{'loading ... '}</div>} */}


          </div>

          <div className="mb-2 mt-2 text-black dark:text-gray-300">
            <b> Now costumer  </b> 

            {/* //todo: register */}
            {/* <Link to={`/register?redirect=${redirect}`}> 
                Create new account 
            </Link> */}

            <button onClick={()=>setRegModel(true)} className="text-blue-600">
              Create new account 
            </button>

          </div>

          <div className="mb-2 mt-2 text-black dark:text-gray-300">
            <b> Welcome </b> <i> to our system </i>
          </div>
            
        </div>
        
      </div>
    </>
  );
}
