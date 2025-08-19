'use client'

import { Button } from "@/components/ui/button"
import CardWrapper from "./CardWrapper"
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { useState } from "react"
import { updatePassword } from "@/app/auth/reset-password/action"
import Link from "next/link"

const resetPasswordSchema = z.object({
    password: z.string().min(4).max(12, {
        message: "Password length must be between 4-12 digits."
    }),
    confirmPassword: z.string().min(4).max(12, {
        message: "Password length must be between 4-12 digits."
    })
})
export default function ResetPasswordForm () {
    const [loading, setLoading] = useState(false);

    const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        }
    });

    async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
        setLoading(true);
        try {
            await updatePassword(data);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <CardWrapper
        title="Reset Password"
        description="Please reset your password"
        backButtonLabel=""
        backButtonHref=""
        backButtonHrefLink="/auth/confirm"
        >
        <div>
            <Form {...resetPasswordForm}>
                <form onSubmit={resetPasswordForm.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField
                        control={resetPasswordForm.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={resetPasswordForm.control}
                        name="confirmPassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                        {
                            loading && 
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-circle-icon lucide-loader-circle animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                        }
                        Reset
                    </Button>
                </form>
            </Form>
            <Button variant="outline" className="w-full mt-4 cursor-pointer">
                <Link href="/auth/login">Cancel</Link>
            </Button>
        </div>
        </CardWrapper>
    )
}