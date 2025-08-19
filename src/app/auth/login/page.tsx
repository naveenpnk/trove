import LoginForm from "@/components/LoginForm";
import { Toaster } from "sonner";

export default async function LoginPage (
    props : { searchParams: Promise<{ redirectTo?: string}>}
    ) {
        const searchParams = await props.searchParams;
        const redirectTo = searchParams.redirectTo ?? "/";
    return (
        <div className="flex justify-center w-full">
            <LoginForm redirectTo={ redirectTo }/>
            <Toaster richColors />
        </div>
    )
}