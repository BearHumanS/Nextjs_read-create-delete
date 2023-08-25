import Link from "next/link";
import "./globals.css";
import type { Metadata } from "next";
import { Control } from "./control";
import { BASE_URL } from "@/utils/Base";

export interface Topic {
  id: number;
  title: string;
}

export const metadata: Metadata = {
  title: "문명 5, 세종대왕 대사",
  description: "Next.js 13 공부 중~",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let topics: Topic[] = [];

  try {
    const res = await fetch(`${BASE_URL}/topics`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`API 호출 오류: ${res.statusText}`);
    }

    topics = await res.json();
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
  }

  return (
    <html>
      <body>
        <h1>
          <Link href="/">세종대왕 대사</Link>
        </h1>
        <ol>
          {topics.map((topic) => (
            <li key={topic.id}>
              <Link href={`/read/${topic.id}`}>{topic.title}</Link>
            </li>
          ))}
        </ol>
        {children}
        <Control />
      </body>
    </html>
  );
}
