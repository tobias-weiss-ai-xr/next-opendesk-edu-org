"use client";

interface EmailLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
}

export default function EmailLink({ className, children, ...props }: EmailLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = ["mai", "lto:", "info", "@", "opendesk-edu.org"].join("");
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
