'use client'

import { Button } from "@/components/ui/button"
import { GitHub } from "@mui/icons-material"
import CardWrapper from "./CardWrapper"
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { login, resetPassword } from "@/app/auth/login/actions"
import { useState } from "react"
import { toast } from "sonner"

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(4).max(12, {
        message: "Password length must be between 4-12 digits."
    })
})
export default function LoginForm ({redirectTo} : {redirectTo: string}) {
    const [loading, setLoading] = useState(false);

    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    async function onSubmit(value: z.infer<typeof loginSchema>) {
        setLoading(true);
        try {
            await login({
                ...value,
                redirectTo
            });
        } finally {
            setLoading(false);
        }
    }

    async function handleForgotPassword(data: Pick<z.infer<typeof loginSchema>, 'email'>) {
        try {
            const response = await resetPassword(data);
            if (response.responseCode) {
                toast.success("Recovery email sent successfully")
            } else {
                toast.error("Email authendication was failed");
            }
        } catch (error) {
            console.log("login:", error);
            toast.error("Email authendication was failed");
        }
    }
    
    return (
        <CardWrapper
        title="Welcome back"
        description="Login to your Trove account"
        backButtonLabel="Don&apos;t have an account?"
        backButtonHref="Create account"
        backButtonHrefLink="/auth/register"
        >
        <div>
            <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField
                        control={loginForm.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" type="email" {...field}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={loginForm.control}
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
                    <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                        {
                            loading && 
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-circle-icon lucide-loader-circle animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                        }
                        Login
                    </Button>
                    <div className="w-full flex justify-end">
                    <Button 
                        type="button" 
                        variant="link" 
                        onClick={() => handleForgotPassword(loginForm.getValues())} 
                        className="underline cursor-pointer">Forget password?</Button>
                    </div>
                </form>
            </Form>
            <div className="border-b-2 my-5 w-full relative flex justify-center items-center">
                <span className="absolute px-2 z-10 bg-neutral-50">Or</span>
            </div>
            <Button variant="outline" className="w-full cursor-pointer">
                <GitHub />
                Continue with Github
            </Button>
        </div>
        </CardWrapper>
    )
}