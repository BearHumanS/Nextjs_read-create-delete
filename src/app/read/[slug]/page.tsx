import { BASE_URL } from "@/utils/Base";

type ReadProps = {
  params: {
    slug: string;
  };
};

const Read = async (props: ReadProps) => {
  const slug = props.params.slug;

  let topics = [];

  try {
    const res = await fetch(`${BASE_URL}/topics/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`API 호출 오류: ${res.statusText}`);
    }

    topics = await res.json();
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
  }
  return (
    <>
      <h2>{topics.title}</h2>
      {topics.body}
    </>
  );
};

export default Read;
