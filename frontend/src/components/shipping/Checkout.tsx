import { cn } from '../../utils/cn';

interface ISteps {
    step1?: boolean;
    step2?: boolean;
    step3?: boolean;
    step4?: boolean;
}

export default function CheckoutSteps(step: ISteps) {
    const pass = 'border-solid border-b-[5px] border-b-blue-500 py-2';
    return (
      <div className="grid grid-cols-4 w-[90%] mx-auto mt-3">
        <div className={step.step1 ? cn(pass) : ''}>Login</div>
        <div className={step.step2 ? cn(pass) : ''}>Shipping</div>
        <div className={step.step3 ? cn(pass) : ''}>Payment</div>
        <div className={step.step4 ? cn(pass) : ''}>Place Order</div>
      </div>
    )
  }
