// src/SidebarContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from "react";
import auth from "../util/auth";

interface SidebarContextProps {
  isOpen: boolean;
  openSidebar: (id: string) => void;
  closeSidebar: () => void;
  data?: {
    [key: number]: (IFood | undefined)[];
  };
  load?: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);
export interface IFood {
  id: string;
  name: string;
  qty: string;
  energy_kcal: number;
  carbohydrate_g: number;
  protein_g: number;
  fat_g: number;
  fiber_g: number;
}

interface IGetResult {
  result: {
    cmp_data: string;
    created_at: Date;
  };
  success: boolean;
  message: string;
}

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState<{
    [key: number]: (IFood | undefined)[];
  }>();

  const openSidebar = (id: string) => {
    getData(id);

    setIsOpen(true);
  };
  const closeSidebar = () => setIsOpen(false);

  const getData = async (id = "1b18b4fe-0fbc-4344-aa1f-023f52a7ba89") => {
    setLoad(true);
    try {
      const res = await auth.get<IGetResult>(`admin/cmp/${id}`);
      const resData = await res.data;
      setData(JSON.parse(resData.result.cmp_data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  return (
    <SidebarContext.Provider
      value={{ isOpen, openSidebar, closeSidebar, data, load }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
