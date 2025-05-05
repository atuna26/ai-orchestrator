// app/login/page.js
"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered");

  useEffect(() => {
    if (isRegistered) {
      // Kayıt işlemi başarılı mesajı
    }
  }, [isRegistered]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      
      if (result.error) {
        setError("Email veya şifre hatalı");
        return;
      }
      
      router.push("/");
      router.refresh();
    } catch (error) {
      setError("Giriş işlemi sırasında bir hata oluştu");
    }
  };

  return (
    <div className="container mx-auto max-w-md py-12">
      <h1 className="text-2xl font-bold mb-6">Giriş Yap</h1>
      
      {isRegistered && (
        <div className="bg-green-100 p-3 mb-4 text-green-700">
          Hesabınız başarıyla oluşturuldu. Şimdi giriş yapabilirsiniz.
        </div>
      )}
      
      {error && <div className="bg-red-100 p-3 mb-4 text-red-700">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block mb-2">Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white p-2 rounded mb-4"
        >
          Giriş Yap
        </button>
      </form>
      
      <p className="text-center">
        Hesabınız yok mu?{" "}
        <Link href="/register" className="text-blue-600">
          Kayıt Ol
        </Link>
      </p>
    </div>
  );
}