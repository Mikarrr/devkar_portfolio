"use client";
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "../animGSAP/animTransition";

interface Props {
  href: string;
  label?: string;
  className?: string;
  target?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  rel?: string;
}

const TransitionLink = ({
  href,
  label,
  className,
  children,
  target,
  style,
  rel,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (pathname === "/" && href.includes("#")) {
      // Go to the link with fragment # on the homepage
      router.push(href);
    } else if (pathname === href) {
      // Scroll to the top of the page if the same link is clicked
      window.scrollTo(0, 0);
    } else {
      // Otherwise, perform the transition animation
      animatePageOut(href, router);
    }
  };

  return (
    <a
      className={className}
      onClick={handleClick}
      href={href}
      target={target}
      style={style}
      rel={rel}
    >
      {children || label}
    </a>
  );
};

export default TransitionLink;
