import React from 'react';

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="hidden md:block md:w-64 bg-white border-r border-gray-200 shadow-sm p-4">
        <div className="font-bold text-xl mb-4">Sidebar</div>
        {/* Buraya navigasyon veya menu koyabilirsiniz */}
        <ul>
          <li className="mb-2"><a href="#" className="hover:text-blue-600">Dashboard</a></li>
          <li className="mb-2"><a href="#" className="hover:text-blue-600">Settings</a></li>
          <li><a href="#" className="hover:text-blue-600">Profile</a></li>
        </ul>
      </aside>
      
      <main className="flex-1 flex flex-col min-w-0 bg-gray-50 dark:bg-dark-bg">
        {/* Navbar */}
        <nav className="h-16 flex items-center px-4 border-b border-gray-200 bg-white dark:bg-dark-bg shadow-sm">
          <div className="font-semibold text-lg">Navbar</div>
          {/* Buraya sağa ek ikonlar, profil, bildirimler eklenebilir */}
        </nav>
        <section className="flex-1 overflow-auto p-6">
          {children}
        </section>
      </main>
    </div>
  );
};

export default DashboardWrapper;
