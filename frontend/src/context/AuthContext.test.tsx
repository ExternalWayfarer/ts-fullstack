import { render, screen, waitFor } from '@testing-library/react';
import AuthContext, {AuthProvider, useAuth, User} from '../context/AuthContext';
import api from '../services/api';
import { describe, it, expect, vi } from "vitest";
import {mockalStorage} from "../mocks/localstorage.ts";

vi.mock('../services/api');
const fakeResponse = {
    data: {
        id: '1000',
        name: "John Titor",
        email: 'timetravel@mail.com',
        role: 'FAKE',
        bio: 'I am looking for IBM5100',
        createdAt: '2000-01-01',
    }
}



describe('AuthProvider', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockalStorage.store = {};
        vi.stubGlobal('localStorage', mockalStorage);
    });

    it('render children when isLoading=false when fetch user with error', async () => {
        //someone calls api.get with some error, yeah
        vi.spyOn(api, 'get').mockRejectedValue(new Error('Some error'));

        render(
            <AuthProvider>
                <div>Children(maybe)</div>
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Children(maybe)')).toBeInTheDocument();
            expect(screen.queryByText('check-up authentication...')).not.toBeInTheDocument();
        });
    });

    it('api get success', async () => {
        mockalStorage.store['accessToken'] = 'fake-token';
        vi.spyOn(api, 'get').mockResolvedValue(fakeResponse);
        render(
            <AuthProvider>
                <div>Children(maybe)</div>
            </AuthProvider>
        );
        await waitFor(() => {
            //console.log(localStorage.getItem('accessToken'));
            expect(api.get).toHaveBeenCalledWith('/users/me', {timeout: 1000});
            expect(screen.getByText('Children(maybe)')).toBeInTheDocument();
            expect(screen.queryByText('check-up authentication...')).not.toBeInTheDocument();
        });

    })
    it('api fail', async () => {


        vi.spyOn(api, 'get').mockRejectedValue(new Error('Some error'));


        expect(api).toBeUndefined;

        })

})