'use client'

import { 
    Card, 
    CardAction, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
    } from "@/components/ui/card"
import Link from "next/link"
import React from "react"

interface CardWrapperProps {
    title: string,
    description: string,
    backButtonHref: string,
    backButtonHrefLink: string,
    backButtonLabel: string,
    children: React.ReactNode
}
export default function CardWrapper ({title, description, backButtonLabel,backButtonHref, backButtonHrefLink, children}: CardWrapperProps) {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle  className="flex justify-center text-3xl font-bold">{title}</CardTitle>
                <CardDescription  className="flex justify-center">
                {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <CardAction>
                <div >{backButtonLabel} <Link href={backButtonHrefLink} className="font-bold">{backButtonHref}</Link></div>
                </CardAction>
            </CardFooter>
        </Card>
    )
}