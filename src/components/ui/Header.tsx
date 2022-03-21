import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex justify-between mx-auto max-w-7xl">
      <div className="flex items-center space-x-5">
        <Link href="/" passHref>
          <img src="/images/1_s986xIGqhfsN8U--09_AdA.png" alt="" className="object-contain w-44 cursor-pointer" />
        </Link>
        <div className="hidden items-center space-x-5 md:inline-flex">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="py-1 px-4 text-white bg-green-600 rounded-full">Follow</h3>
        </div>
      </div>

      <div className="flex items-center space-x-5 text-green-600">
        <h3>Sign In</h3>
        <h3 className="py-1 px-4 rounded-full border border-green-600">Get started</h3>
      </div>
    </header>
  );
};
