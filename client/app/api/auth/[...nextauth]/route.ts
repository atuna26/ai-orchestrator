import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Şifre", type: "password" }
      },
      async authorize(credentials) {
        try {
          // API'ye istek gönderme
          const res = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
         
          const response = await res.json();
          
          // API'den dönen cevap yapısına göre kullanıcı ve token bilgilerini ayarla
          if (res.ok && response) {
            // Next-Auth'un beklediği yapıya dönüştürme
            return {
              id: response.user._id,
              email: response.user.email,
              name: response.user.name || response.user.email.split('@')[0], // Eğer name yoksa email'den oluştur
              accessToken: response.token
            };
          }
          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // authorize'dan dönen kullanıcı bilgilerini token'a ekle
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      // token'dan session'a bilgileri aktar
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/login',  // Özel login sayfası
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  },
});

export { handler as GET, handler as POST };