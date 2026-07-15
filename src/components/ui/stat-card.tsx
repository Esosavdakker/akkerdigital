import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type StatCardProps = {
  label: string;
  value: number | string;
  description: string;
  icon?: ReactNode;
};

export function StatCard({
  label,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>

        {icon && (
          <div className="flex size-9 items-center justify-center rounded-xl bg-muted">
            {icon}
          </div>
        )}
      </CardHeader>

      <CardContent>
        <p className="text-3xl font-semibold tracking-tight">
          {value}
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}