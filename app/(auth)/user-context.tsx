"use client";

import { createContext, useContext } from "react";
import type { Session, User } from "better-auth";

type SessionContextType = {
  user: User;
  session: Session;
};

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: SessionContextType;
}) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
