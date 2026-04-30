'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { Order, OrderLine, Patient } from '@/components/types';

type OrderPayload = Omit<Order, 'orderId' | 'createdAt'>;

type OrderContextState = {
  selectedPatient: Patient | null;
  setSelectedPatient: (p: Patient | null) => void;
  orderQueue: Order[]; // in-memory queue
  addOrder: (order: OrderPayload) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addTestsToPatient: (patientId: string, lines: OrderLine[]) => Array<{
    id: string;
    name: string;
    specimen?: string;
    priority?: OrderLine['priority'];
    date: string;
    status: 'pending'|'processing'|'completed'|'cancelled'|'running';
  }>;
  showQueue: boolean;
  setShowQueue: (v: boolean) => void;

  // newly added: track selected order to show inline details
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
};

const OrderContext = createContext<OrderContextState | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [orderQueue, setOrderQueue] = useState<Order[]>([]);
  const [showQueue, setShowQueue] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const addOrder = useCallback((payload: OrderPayload) => {
    const order: Order = {
      ...payload,
      orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      createdAt: new Date().toISOString(),
    };
    setOrderQueue((q) => [order, ...q]);
    // Automatically select the newly created order for inline details
    setSelectedOrderId(order.orderId);
    return order;
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    setOrderQueue((q) => q.map((o) => (o.orderId === orderId ? { ...o, status } : o)));
  }, []);

  const addTestsToPatient = useCallback((patientId: string, lines: OrderLine[]) => {
    const nowIso = new Date().toISOString();
    return lines.map((l, idx) => ({
      id: `T-${Date.now()}-${idx}`,
      name: l.name,
      specimen: l.specimen,
      priority: l.priority,
      date: nowIso,
      status: 'pending' as const,
    }));
  }, []);

  const value = useMemo(
    () => ({
      selectedPatient,
      setSelectedPatient,
      orderQueue,
      addOrder,
      updateOrderStatus,
      addTestsToPatient,
      showQueue,
      setShowQueue,
      selectedOrderId,
      setSelectedOrderId,
    }),
    [selectedPatient, orderQueue, addOrder, updateOrderStatus, addTestsToPatient, showQueue, selectedOrderId]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export function useOrderContext() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrderContext must be used within OrderProvider');
  return ctx;
}