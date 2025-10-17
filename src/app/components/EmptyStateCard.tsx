'use client';

import { Card, CardContent } from '@/components/ui/card';

interface EmptyStateCardProps {
  title?: string;
  message?: string;
}

export default function EmptyStateCard({
  title = "No hay datos para mostrar",
  message = "Sube un archivo Excel para comenzar a procesar tus datos y agregar imágenes complementarias"
}: EmptyStateCardProps) {
  return (
    <Card className="border-muted/20 shadow-lg">
      <CardContent className="pt-6">
        <div className="text-center py-16">
          <div className="p-4 bg-muted/20 rounded-full inline-flex mb-4">
            <svg
              className="w-12 h-12 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-muted-foreground font-sans mb-2">
            {title}
          </h3>
          <p className="text-muted-foreground font-sans max-w-md mx-auto">
            {message}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}