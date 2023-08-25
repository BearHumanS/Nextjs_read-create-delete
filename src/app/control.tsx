"use client";
import { BASE_URL } from "@/utils/Base";
import Link from "next/link";
import { useParams, useRouter, usePathname } from "next/navigation";

export const Control = () => {
  const params = useParams();
  const slug = params.slug;
  const router = useRouter();
  const pathname = usePathname();

  const onDelete = () => {
    fetch(`${BASE_URL}/topics/${slug}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        router.push("/");
        router.refresh();
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  };

  return (
    <ul>
      {pathname !== "/create" && (
        <li>
          <Link href="/create">생성</Link>
        </li>
      )}
      {slug ? (
        <>
          <li>
            <Link href={`/update/${slug}`}>업데이트</Link>
          </li>
          <li>
            <input type="button" value="삭제" onClick={onDelete} />
          </li>
        </>
      ) : null}
    </ul>
  );
};
