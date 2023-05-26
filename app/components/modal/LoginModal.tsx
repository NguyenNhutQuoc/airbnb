'use client';

import {signIn} from 'next-auth/react'

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import {useRouter} from 'next/navigation'
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import { sign } from 'crypto';


const LoginModal = () =>  {
    const LoginModal = useLoginModal();
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
    
        signIn('credentials', {
          ...data,
          redirect: false
        }).then((callback) => {

          setIsLoading(false)
          if (callback?.ok) {
            toast.success('Logged in')
            router.refresh() 
            LoginModal.onClose()
          }

          if (callback?.error) {
            toast.error(callback.error)
          }
        })
      }
    
      const onToggle = useCallback(() => {
        LoginModal.onClose();
      }, [LoginModal])


    const { 
      register, 
      handleSubmit,
      formState: {
        errors,
      },
    } = useForm<FieldValues>({
      defaultValues: {
        email: '',
        password: ''
      },
    });

    const bodyContent = (
        <div className="flex flex-col gap-4">
          <Heading
            title="Welcome back!"
            subtitle="Login to your account!"
          />
          <Input
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      )

      const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
          <hr />
          <Button 
            outline 
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => signIn('google')} 
          />
          <Button 
            outline 
            label="Continue with Github"
            icon={AiFillGithub}
            onClick={() => signIn('github')}
          />
        </div>
      )
    
      return (
        <Modal
          disabled={isLoading}
          isOpen={LoginModal.isOpen}
          title="Login"
          actionLabel="Continue"
          onClose={LoginModal.onClose}
          body={bodyContent}
        onSubmit={handleSubmit(onSubmit)}
        footer={footerContent}
        />
      );
}

export default LoginModal;