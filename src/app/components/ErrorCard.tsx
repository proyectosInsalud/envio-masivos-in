'use client';

import { Card, CardContent } from '@/components/ui/card';

interface ErrorCardProps {
  title?: string;
  message: string;
}

export default function ErrorCard({
  title = "Error al procesar el archivo",
  message
}: ErrorCardProps) {
  return (
    <Card className="border-destructive/20 shadow-lg bg-destructive/5">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-destructive/10 rounded-full flex-shrink-0">
            <svg
              className="w-5 h-5 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-destructive font-sans mb-1">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground font-sans">{message}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}