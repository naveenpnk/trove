'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { RegisterFormType } from '@/types/formData'


export async function register(formData: RegisterFormType) {
  const supabase = await createClient()
  
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email as string,
    password: formData.password as string,
  }
  console.log("sign up ",formData, data);
  
  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log("errorMsg", error)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}