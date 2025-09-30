import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RetroButton from "./retrobutton";
import { describe, it, expect, vi } from "vitest";


describe('RetroButton', () => {

    it('Renders correctly', () => {
        render(<RetroButton children='CLICK'/>);
        const buttonElement = screen.getByRole('button', {name: /CLICK/i});
        expect(buttonElement).toBeInTheDocument();
    });

    it('Calls onclick', () => {
        const handleClick = vi.fn();
        render(<RetroButton children='CLICK' onClick={handleClick}/>);
        const buttonElement = screen.getByText(/CLICK/i);
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    })
})