import clsx from "clsx";

export const PageWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "my-24 max-w-screen-xl w-full mx-auto px-6 md:p-0",
        className,
      )}
    >
      {children}
    </div>
  );
};
