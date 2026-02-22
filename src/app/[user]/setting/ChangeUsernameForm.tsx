'use client';

import { useState } from 'react';

export default function ChangeUsernameForm() {
    const [newUsername, setNewUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (!newUsername || !password) {
            setError('New username and password are required');
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await fetch('/api/users/change-username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newUsername,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Failed to change username');
                return;
            }

            setSuccess(data.message || 'Username changed successfully');
            setNewUsername('');
            setPassword('');
        } catch {
            setError('Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="newUsername" className="block text-sm font-medium text-gray-700">
                    New Username
                </label>
                <input
                    id="newUsername"
                    name="newUsername"
                    type="text"
                    value={newUsername}
                    onChange={(event) => setNewUsername(event.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none ring-0 focus:border-gray-400"
                    placeholder="Enter new username"
                />
            </div>

            <div>
                <label htmlFor="usernamePassword" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    id="usernamePassword"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none ring-0 focus:border-gray-400"
                    placeholder="Enter your password"
                />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}

            <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
                {isSubmitting ? 'Changing...' : 'Change Username'}
            </button>
        </form>
    );
}
