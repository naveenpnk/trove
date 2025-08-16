import LoginForm from "@/components/LoginForm";

export default async function LoginPage (
    props : { searchParams: Promise<{ redirectTo?: string}>}
    ) {
        const searchParams = await props.searchParams;
        const redirectTo = searchParams.redirectTo ?? "/";
    return (
        <div className="flex justify-center w-full">
            <LoginForm redirectTo={ redirectTo }/>
        </div>
    )
}