"use client";

import { BASE_URL } from "@/utils/Base";
import { useRouter } from "next/navigation";

const Create = () => {
  const router = useRouter();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const body = (form.elements.namedItem("body") as HTMLTextAreaElement).value;
    fetch(`${BASE_URL}/topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const lastId = data.id;
        router.push(`/read/${lastId}`);
        router.refresh();
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="생성" />
        </p>
      </form>
    </>
  );
};

export default Create;
