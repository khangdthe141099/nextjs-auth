"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { useToast } from "@/components/ui/use-toast";
import authApiRequest from "@/apiRequests/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";
import { useEffect, useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (searchParams.get("redirectFrom") === "/logout") {
      // alert('Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.')
    }
  }, [searchParams]);

  const axiosClient = axios.create({
    baseURL: "https://nestjs-production-ee93.up.railway.app/",
    headers: {
      "Content-Type": "application/json, text/plain",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    if (loading) return;
    setLoading(true);

    axiosClient
      .post("auth/login", {
        email: "linh@gmail.com",
        password: "Linh123@",
      })
      .then((res: any) => console.log({ res }))
      .catch((err: any) => console.log({ err }));
    // try {
    //   const result = await authApiRequest.login(values)
    //   toast({
    //     description: result.payload.message
    //   })
    //   await authApiRequest.auth({ sessionToken: result.payload.data.token })
    //   router.push('/me')
    // } catch (error: any) {
    //   handleErrorApi({
    //     error,
    //     setError: form.setError
    //   })
    // } finally {
    //   setLoading(false)
    // }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
        noValidate
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="!mt-8 w-full">
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
