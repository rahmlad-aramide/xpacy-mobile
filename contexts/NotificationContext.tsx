import React, { createContext, useContext, useState, ReactNode, useEffect, Dispatch, SetStateAction, useMemo } from "react";
import { INotification } from "@/types";
import SwipeData from "@/screens/Main/Notifications/data";

// ✅ Define Sorting Options
type SortOption = "Default" | "Last 7 Days" | "Last 30 Days" | "Last 90 Days"| string;

// ✅ Define Filtering Options
type FilterOption = "All" | "General" | "Services" | "Properties" | "Payment" | string;

interface NotificationContextProps {
  notifications: INotification[];
  addNotification: (notification: INotification) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  sortOption: SortOption;
  setSortOption: Dispatch<SetStateAction<SortOption>>;
  filterOption: FilterOption;
  setFilterOption: Dispatch<SetStateAction<FilterOption>>;
  sortedAndFilteredNotifications: INotification[];
  fetchNotifications: () => Promise<void>;
  loading: boolean;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("Default");
  const [filterOption, setFilterOption] = useState<FilterOption>("General");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch notifications from API
  const fetchNotifications = async () => {
    try {
    //   const response = await fetch("https://app.xpaxy.com/notifications");
    //   const data: INotification[] = await response.json();
      setNotifications(SwipeData);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  // ✅ Add Notification
  const addNotification = (notification: INotification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  // ✅ Remove Notification
  const removeNotification = async(id: string) => {
    setLoading(true);
    try {
        
        setTimeout(() => {
            setNotifications((prev) => prev.filter((notif) => notif.id !== id));
        }, 300);
    } catch (error) {
        console.log(error)
    } finally{
        setLoading(false);
    }
  };

  // ✅ Clear All Notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  const sortedAndFilteredNotifications = useMemo(() => {
    return [...notifications]
      .filter((notif) => (filterOption === "General" ? true : notif.title === filterOption))
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (sortOption === "Default") return dateB.getTime() - dateA.getTime();
        if (sortOption === "Last 7 Days") return dateB.getTime() - dateA.getTime();
        if (sortOption === "Last 30 Days") return dateB.getTime() - dateA.getTime();
        if (sortOption === "Last 90 Days") return dateB.getTime() - dateA.getTime();
        return 0;
      });
  }, [notifications, sortOption, filterOption]);

  useEffect(()=> {
    fetchNotifications();
  },[])
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearNotifications,
        sortOption,
        setSortOption,
        filterOption,
        setFilterOption,
        sortedAndFilteredNotifications,
        fetchNotifications,
        loading
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// ✅ Custom Hook to Use Notifications
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
