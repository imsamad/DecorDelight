"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { CircleArrowLeftIcon } from "lucide-react";

const GoBackButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.back();
      }}
      variant="secondary"
    >
      <CircleArrowLeftIcon className="w-4 h-4 mr-4" />
      Go Back
    </Button>
  );
};

export default GoBackButton;
