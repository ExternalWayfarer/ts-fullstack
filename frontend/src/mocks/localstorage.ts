import {vi} from "vitest";
export const mockalStorage = {
    store: {} as Record<string, string>,

    getItem: vi.fn((key: string) => mockalStorage.store[key] || null),

    setItem: vi.fn((key: string, value: string) => {mockalStorage.store[key] = value;}),

    removeItem: vi.fn((key: string) => {delete mockalStorage.store[key];}),

    clear: vi.fn(() => {mockalStorage.store = {};}),
};