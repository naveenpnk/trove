'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LoginFormData, ResetPasswordFormData } from '@/types/formData'
export async function login(formData: LoginFormData) {
  
  const supabase = await createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email as string,
    password: formData.password as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    redirect('/auth/not-found')
  }
  revalidatePath('/', 'layout')
  redirect(formData.redirectTo || '/')
};


export async function resetPassword(formData: ResetPasswordFormData) {

  const supabase = await createClient();

  const email = formData.email as string;

  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  console.log("errorMessage", error);
  console.log("responseMessage", data);
  if (error) {
    return {
      errorCode: error.status,
      errorMessage: error.code
    }
  } else {
    // if there is no error, password reset request will send to email
    console.log(data)
    return {
      responseCode: 200,
      responseMessage: "Recovery email sent successfully"
    }
  }

}