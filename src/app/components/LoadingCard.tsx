'use client';

import { Card, CardContent } from '@/components/ui/card';

interface LoadingCardProps {
  message?: string;
  subMessage?: string;
}

export default function LoadingCard({
  message = "Procesando archivo...",
  subMessage = "Esto puede tomar unos segundos"
}: LoadingCardProps) {
  return (
    <Card className="border-primary/20 shadow-lg">
      <CardContent className="pt-6">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary"></div>
          </div>
          <p className="mt-4 text-lg text-muted-foreground font-sans">{message}</p>
          <p className="text-sm text-muted-foreground/70 font-sans mt-2">
            {subMessage}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}