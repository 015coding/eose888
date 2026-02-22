import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { changeUsername } from '@/service/user/user.service';

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { newUsername, password } = await request.json();

        if (!newUsername || !password) {
            return NextResponse.json(
                { error: 'New username and password are required' },
                { status: 400 }
            );
        }

        const result = await changeUsername(session.user.id, password, newUsername);

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Something went wrong';
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
