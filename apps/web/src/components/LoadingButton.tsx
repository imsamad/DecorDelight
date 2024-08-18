"use client";
import { Button, ButtonProps } from "./ui/button";
import { Loader2 } from "lucide-react";

const LoadingButton = ({
  isLoading,
  label,
  ...rest
}: {
  label: string;
  isLoading: boolean;
} & ButtonProps) => {
  return (
    <Button disabled={isLoading} {...rest}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {label}
    </Button>
  );
};

export default LoadingButton;
