import React from "react";
interface RetroButtonProps  {
    children: React.ReactNode;
    onClick?: () => void;
};

export default function RetroButton({ children, onClick }: RetroButtonProps) {
    return (
        <button
            onClick={onClick}
            className="
        bg-steam-oliveLight text-steam-textLight px-4 py-2 text-sm font-semibold
        border-t-[1px] border-l-[1px] border-white
        border-b-[1px] border-r-[1px] border-black
        rounded-none
        hover:bg-steam-oliveHover
        active:border-t-[1px] active:border-l-[1px] active:border-white
        active:border-b-[1px] active:border-r-[1px] active:border-black
        transition-colors
      "
        >
            {children}
        </button>
    );
}
