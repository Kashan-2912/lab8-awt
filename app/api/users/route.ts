import { NextResponse } from 'next/server';

// Simulated database
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com' },
];

// GET - Fetching Users
export async function GET() {
  // Simulating database call
  const allUsers = users;
  return NextResponse.json(allUsers);
}

// POST - Creating User
export async function POST(request: Request) {
  const body = await request.json();
  const newUser = {
    id: users.length + 1,
    name: body.name,
    email: body.email,
  };
  users.push(newUser);
  return NextResponse.json(newUser, { status: 201 });
}
