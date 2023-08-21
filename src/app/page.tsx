"use client";

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

const schema = z.object({
  email: z.string().email({ message: "メールアドレスを正しく入力してください" }),
  password: z.string().min(8, "パスワードを8文字以上で入力してください").max(20, "パスワードを20文字以下で入力してください"),
  retype_password: z.string().min(8, "パスワードを8文字以上で入力してください").max(20, "パスワードを20文字以下で入力してください")
})
  .refine((value) => value.password === value.retype_password, {
    message: "パスワードが一致しません",
    path: ['retype_password']
  })

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<FieldValues> = (values) => {

    setLoading(true)

    // こちらで、APIへのポストなどを行う

    setLoading(false)

    // alertで簡便に出力しているが、本来は、適宜要件に合わせてUI処理する
    alert("処理を完了しました。")
  }

  return (
    <main className="m-10 p-5 bg-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl font-bold leading-loose pt-6">Zodの動作確認を行うサンプルプロジェクトです。</h2>

        <div className="pt-6">

          <h5 className="font-bold">メールアドレス</h5>

          <div className="py-2 w-full flex">
            <input {...register('email')} className={"w-full px-6 py-4 rounded-md text-xl" + (errors.email ? " border-red-500 border-2" : " border")} placeholder="メールアドレスを入力" />
          </div>
          {errors.email && <div className="text-red-500">{errors?.email?.message?.toString()}</div>}
        </div>

        <div className="pt-6">
          <h5 className="font-bold">パスワード</h5>
          <div className="py-2 w-full flex">
            <input
              {...register('password')}
              className={"w-full px-6 py-4 rounded-md text-xl" + (errors.password ? " border-red-500 border-2" : " border")}
              type="password"
              placeholder="パスワードを入力してください"
            />
          </div>
          {errors.password && <div className="text-red-500">{errors?.password?.message?.toString()}</div>}
        </div>
        <div className="pt-6">
          <h5 className="font-bold">パスワード（確認）</h5>
          <div className="py-2 w-full flex">
            <input
              {...register('retype_password')}
              className={"w-full px-6 py-4 rounded-md text-xl" + (errors.retype_password ? " border-red-500 border-2" : " border")}
              type="password"
              placeholder="パスワード（確認）を入力してください"
            />
          </div>
          {errors.retype_password && <div className="text-red-500">{errors?.retype_password?.message?.toString()}</div>}
        </div>

        <div className="w-full pt-12 pb-6">
          <button type="submit" className="w-full bg-blue-300 hover:bg-blue-200 text-gray-700 font-semibold px-4 py-4 rounded-md">
            送信
          </button>
        </div>


      </form>
    </main >

  );
};

export default Page