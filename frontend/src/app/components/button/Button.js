"use client";
import Link from "next/link";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { Magnetic } from "../motion-primitives/magnetic";

export const IconTypes = {
  ARROW_RIGHT: "ARROW_RIGHT",
  SEARCH: "SEARCH",
};

const springOptions = { bounce: 0.1 };

const BaseButton = ({ children, icon, ...rest }) => (
  <button
    type="button"
    {...rest}
    className="inline-flex items-center rounded-full border border-black bg-white px-5 py-2 text-sm font-medium text-black transition-all duration-300 hover:bg-black hover:text-white dark:border-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
  >
    <Magnetic
      intensity={0.1}
      springOptions={springOptions}
      actionArea="global"
      range={200}
    >
      <span>{children}</span>
    </Magnetic>
    {icon && <Button.Icon iconType={icon} />}
  </button>
);

const Button = (props) => {
  const { href, children, icon, onClick } = props;

  if (href) {
    return (
      <Link href={href} className="inline-block">
        <Magnetic
          intensity={0.2}
          springOptions={springOptions}
          actionArea="global"
          range={200}
        >
          <BaseButton icon={icon}>{children}</BaseButton>
        </Magnetic>
      </Link>
    );
  }

  return (
    <Magnetic
      intensity={0.2}
      springOptions={springOptions}
      actionArea="global"
      range={200}
    >
      <BaseButton onClick={onClick} icon={icon}>
        {children}
      </BaseButton>
    </Magnetic>
  );
};

Button.Icon = ({ iconType }) => {
  if (iconType === IconTypes.ARROW_RIGHT) {
    return <FaArrowRight className="ml-2 text-inherit" />;
  }
  if (iconType === IconTypes.SEARCH) {
    return <FaSearch className="ml-2 text-inherit" />;
  }
  return null;
};

Button.Icon.displayName = "Button.Icon";

export default Button;
