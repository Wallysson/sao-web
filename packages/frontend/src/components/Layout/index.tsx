import { ReactNode } from 'react';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ">
        <Header />
        <main className="flex-1 p-4 bg-zinc-200 ">{children}</main>
      </div>
    </div>
  );
}
