'use client'
 
import { useFormStatus } from 'react-dom'
import { Button } from './button'
import ButtonLoader from '@/app/button-loader'
import { ButtonHTMLAttributes } from 'react'

export default function SubmitButton({ children,props }: { children: React.ReactNode,props?: ButtonHTMLAttributes<HTMLButtonElement> }) {
  const { pending } = useFormStatus()
 
	return (
		<Button type="submit" disabled={pending} {...props}>
			{pending ? (
				<>
					<ButtonLoader />
					Submitting...
				</>
      ) : (
        children
      )}
    </Button>
  )
}