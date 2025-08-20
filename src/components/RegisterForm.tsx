'use client'

import { Button } from "@/components/ui/button"
import { GitHub } from "@mui/icons-material"
import CardWrapper from "./CardWrapper"
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
    } from "./ui/form"
import { Input } from "./ui/input"
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { register } from "@/app/auth/register/actions"
import { useState } from "react"


const registerSchema = z.object({
    username: z.string().min(3, {
        message: "Username must be at least 3 characters."
    }),
    email: z.email(),
    password: z.string().min(4).max(12, {
        message: "Password length should be between 4-12."
    })
})

export default function RegisterForm () {
    const [loading, setLoading] = useState(false);

    const registerForm = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    })
    async function onSubmit(value: z.infer<typeof registerSchema>) {
        setLoading(true);
        try {
            await register(value)
        } finally {        // error block will get redirected to error page.
            setLoading(false);
        }
    } 

    return (
        <CardWrapper
        title="Trove."
        description="Track smart, land faster."
        backButtonLabel="Already have an account?"
        backButtonHref="Log in"
        backButtonHrefLink="/auth/login"
        >
        <div>
            <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField
                        control={registerForm.control}
                        name="username"
                        render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                            <Input type="text" placeholder="Your name" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={registerForm.control}
                        name="email"
                        render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                            <Input type="email" placeholder="Email" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={registerForm.control}
                        name="password"
                        render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                            <Input type="password" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                        {
                            loading && 
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-circle-icon lucide-loader-circle animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                        }
                    Register
                    </Button>
                </form>
            </Form>
            <div className="border-b-2 my-6 w-full relative flex justify-center items-center">
                <span className="absolute px-2 z-10">Or</span>
            </div>
            <Button variant="outline" className="w-full cursor-pointer">
                <GitHub />
                Continue with Github
            </Button>
        </div>
        </CardWrapper>
    )
}