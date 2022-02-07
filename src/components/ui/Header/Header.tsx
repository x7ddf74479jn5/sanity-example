import Link from "next/link";

type Props = {};

export const Header = (props: Props) => {
  return (
    <header>
      <div>
        <Link href="/" passHref>
          <img src="/images/1_s986xIGqhfsN8U--09_AdA.png" alt="" className="object-contain w-44 cursor-pointer" />
        </Link>
      </div>
      <div></div>
    </header>
  );
};
