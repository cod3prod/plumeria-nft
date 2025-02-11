"use client";

import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CallToAction() {
  const router = useRouter();
  return (
    <div className="flex gap-4 justify-center">
      <Button
        className="w-36 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        onClick={() => router.push("/mint")}
      >
        민팅하기
      </Button>
      <Button
        className="w-36 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
        onClick={() => router.push("/dashboard")}
      >
        더 알아보기
      </Button>
    </div>
  );
}
