'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { LoginFormType } from '@/types/formData'
export async function login(formData: LoginFormType) {
  
  const supabase = await createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email as string,
    password: formData.password as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    console.log("login error", error.message);
    
    redirect('/error')
  }
  revalidatePath('/', 'layout')
  redirect(formData.redirectTo || '/')
}