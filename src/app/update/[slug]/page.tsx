"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/utils/Base";

const Update = () => {
  const router = useRouter();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const slug = params.slug;

  useEffect(() => {
    fetch(`${BASE_URL}/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTitle(data.title);
        setBody(data.body);
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const body = (form.elements.namedItem("body") as HTMLTextAreaElement).value;

    fetch(`${BASE_URL}/topics/${slug}`, {
      method: "PATCH",
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
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="업데이트" />
        </p>
      </form>
    </>
  );
};

export default Update;
