import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import DashboardClient from './DashboardClient';

async function getUserData() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // You might want to check for admin role here too if strictly required
    // if (decoded.role !== 'admin') redirect('/unauthorized');
    return decoded;
  } catch {
    redirect('/login');
  }
}

export default async function DashboardPage() {
  const userData = await getUserData();
  return <DashboardClient />;
}
