import { ThemeChanger } from "@/components/themeChanger";
import Link from "next/link";

type HeaderProps = {
  className?: string;
};

export const Header = ({ className }: HeaderProps) => (
  <header className={`navbar mx-0 mb-5 p-0 sm:mb-10 ${className && className}`}>
    <div className="navbar-start">
      <Link href="/" passHref>
        <button className="btn btn-ghost ml-[-1rem] text-xl normal-case">
          Como va la facu?
        </button>
      </Link>
    </div>
    <div className="navbar-end mr-[-1rem]">
      <ThemeChanger />
    </div>
  </header>
);
