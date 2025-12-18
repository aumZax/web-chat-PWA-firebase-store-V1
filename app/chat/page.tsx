// app/chat/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
}

export default function ChatPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // เช็คว่า login หรือยัง
    const userData = localStorage.getItem("user");
    
    if (!userData) {
      // ถ้ายัง login ให้ redirect ไปหน้า login
      router.push("/login");
      return;
    }

    setUser(JSON.parse(userData));
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl">กำลังโหลด...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-900 text-white p-4 flex flex-col">
        <h2 className="font-bold mb-4">Channels</h2>
        <ul className="space-y-2 flex-1">
          <li className="cursor-pointer hover:bg-slate-800 px-2 py-1 rounded">
            # general
          </li>
          <li className="cursor-pointer hover:bg-slate-800 px-2 py-1 rounded">
            # random
          </li>
        </ul>
        
        {/* User Info */}
        <div className="border-t border-slate-700 pt-4 mt-4">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <div className="font-semibold">{user?.email}</div>
              <div className="text-slate-400 text-xs">Online</div>
            </div>
            <button
              onClick={handleLogout}
              className="text-xs bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition"
            >
              ออก
            </button>
          </div>
        </div>
      </aside>

      {/* Chat */}
      <main className="flex-1 flex flex-col">
        <header className="border-b p-4 font-semibold bg-white">
          # general
        </header>
        
        <section className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="mb-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {user?.email.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{user?.email}</span>
                  <span className="text-xs text-gray-500">เมื่อสักครู่</span>
                </div>
                <p className="text-gray-700">เค้ารักเธอนะ 🤣🤣🤣🤣🤣🤣</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t p-4 bg-white">
          <input
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="พิมพ์ข้อความ..."
          />
        </footer>
      </main>
    </div>
  );
}