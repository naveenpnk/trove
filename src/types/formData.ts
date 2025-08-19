
export type RegisterFormData = {
    username: string,
    email: string, 
    password: string
};

export type LoginFormData = {
    email: string, 
    password: string,
    redirectTo: string
};

export type ResetPasswordFormData = {
    email: string,
}

export type UpdatePasswordFormData = {
    password: string,
    confirmPassword: string
}