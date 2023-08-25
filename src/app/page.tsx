import Image from "next/image";

export default function Home() {
  return (
    <>
      <h2>조선의 궁궐에 당도한 것을 환영하오, 낯선이여.</h2>
      <Image src="/세종대왕2.jpeg" width={400} height={400} alt="로고" />
    </>
  );
}
