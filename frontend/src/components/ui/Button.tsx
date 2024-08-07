import React from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'
import Spinner from '../../assets/spinner/Spinner'
//import { MdNavigateNext } from "react-icons/md";


const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800',
  {
    variants: {
      variant: {
        primary:
          'w-full dark:text-white gap-1 bg-blue-500 dark:bg-blue-500 hover:bg-blue-700 hover:text-dark dark:hover:bg-blue-700 rounded-md text-[16px] px-3 font-semibold text-center inline-flex items-center',
        danger:
          'w-full dark:text-white gap-1 bg-red-500 dark:bg-red-500 hover:bg-red-700 hover:text-dark dark:hover:bg-red-700 rounded-md text-[16px] px-3 font-semibold text-center inline-flex items-center',
        default:
          'bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900',
        destructive:
          'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600',
        outline:
          'bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100',
        subtle:
          'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100',
        ghost:
          'bg-transparent dark:bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100 dark:hover:text-slate-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
        link: 'bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-300 hover:bg-transparent dark:hover:bg-transparent',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
      href?: string,
      isLoading? : boolean,
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, href, variant, size, ...props }, ref) => {
    if (href) {
      return (
        <Link to={'/'}
          ref={href}
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {children}
        </Link>
      )
    }
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      > 
        <div className='grid grid-cols-5 gap-0 w-full'>
          <div className='flex justify-end w-full col-span-1'>
            {props.isLoading && <Spinner/>}
            {/* <Spinner/> */}
          </div>
          <main className='text-center w-full col-span-3'>
            {props.title}
          </main>
          <div className='w-full col-span-1 text-2xl'>
            {/* <MdNavigateNext /> */}
          </div>
        </div> 
      </button>
    )
  }
)
Button.displayName = 'Button'