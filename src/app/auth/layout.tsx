export default function AuthLayout (
    {children}: {children: React.ReactNode}
) {
    return (
        <div className="w-full flex items-center justify-center h-screen bg-neutral-100 dark:bg-neutral-700">
            {children}
        </div>
    )
}