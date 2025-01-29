import { createContext, useContext, useState } from 'react';

interface SidebarContextType {
  sidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    console.log('Opening sidebar'); // Debug log
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    console.log('Closing sidebar'); // Debug log
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    console.log('Toggling sidebar'); // Debug log
    setSidebarOpen(prev => !prev);
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebarOpen,
        openSidebar,
        closeSidebar,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
}; 