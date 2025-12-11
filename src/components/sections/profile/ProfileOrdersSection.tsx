import React from "react";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { useI18n } from "../../../i18n/I18nContext";
import { Link } from "react-router-dom";

export const ProfileOrdersSection: React.FC = () => {
  const role = "customer"; // fallback value; wire up with real auth hook/context when available
  const { t } = useI18n();

  const orders = [
    {
      id: "#ORD-7782",
      date: "Oct 24, 2025",
      status: "Delivered",
      total: "$145.00",
      items: 3,
    },
    {
      id: "#ORD-8821",
      date: "Nov 02, 2025",
      status: "Processing",
      total: "$85.50",
      items: 1,
    },
    {
      id: "#ORD-9932",
      date: "On Hold",
      status: "Cancelled",
      total: "$210.00",
      items: 4,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Processing":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-text-main">
        {t("profile.orders.title")}
      </h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="p-6 rounded-[2rem] bg-bg-elevated border-border-subtle hover:border-primary/50 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-text-main">{order.id}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-text-muted">
                  {order.date} • {order.items} {t("profile.orders.items")}
                </p>
                {role === "customer" && (
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-text-muted">
                      Order Type: Wholesale
                    </p>
                    <p className="text-xs text-text-muted">
                      Paid Amount: $100.00
                    </p>
                    <p className="text-xs text-text-muted">
                      Remaining Amount: $45.00
                    </p>
                    <p className="text-xs text-text-muted">
                      Next Payment Date: Nov 15, 2025
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                <span className="font-display font-bold text-lg text-text-main">
                  {order.total}
                </span>
                <Link to={`/orders/${order.id.replace("#", "")}`}>
                  <Button
                    variant="secondary"
                    className="px-4 py-2 text-xs rounded-xl h-auto"
                  >
                    {t("profile.orders.view")}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
