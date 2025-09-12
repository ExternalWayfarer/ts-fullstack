import React from "react";
type RetroButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
};

export default function RetroButton({ children, onClick }: RetroButtonProps) {
    return (
        <button
            onClick={onClick}
            className="
        bg-steam-oliveLight text-steam-textLight px-4 py-2 text-sm font-semibold
        border-t-[2px] border-l-[2px] border-white
        border-b-[2px] border-r-[2px] border-black
        rounded-none
        hover:bg-steam-oliveHover
        active:border-t-[2px] active:border-l-[2px] active:border-white
        active:border-b-[2px] active:border-r-[2px] active:border-black
        transition-colors
      "
        >
            {children}
        </button>
    );
}
