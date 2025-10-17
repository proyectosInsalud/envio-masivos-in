'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import type { Manager } from '@/types';

// Mock data para desarrollo
const mockManagers: Manager[] = [
  {
    id: '1',
    name: 'María González',
    phone: '+51 987 654 321',
    product: 'VPH',
    sede: 'Golf'
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    phone: '+51 987 654 322',
    product: 'Prostatitis',
    sede: 'SJM'
  },
  {
    id: '3',
    name: 'Ana López',
    phone: '+51 987 654 323',
    product: 'VPH',
    sede: 'JM'
  },
  {
    id: '4',
    name: 'Pedro Martínez',
    phone: '+51 987 654 324',
    product: 'Prostatitis',
    sede: 'Golf'
  },
  {
    id: '5',
    name: 'Laura Sánchez',
    phone: '+51 987 654 325',
    product: 'VPH',
    sede: 'SJM'
  }
];

interface ManagersTableProps {
  selectedManager: string | null;
  onManagerSelect: (managerId: string) => void;
}

export default function ManagersTable({ selectedManager, onManagerSelect }: ManagersTableProps) {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        // En desarrollo usamos mock data
        // En producción: const response = await axios.get<ManagersResponse>('/api/managers');
        // setManagers(response.data.data);

        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));

        setManagers(mockManagers);
      } catch (err) {
        setError('Error al cargar los gestores');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchManagers();
  }, []);

  if (loading) {
    return (
      <Card className="border-primary/20 shadow-lg">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary/20 border-t-primary"></div>
            </div>
            <p className="mt-4 text-muted-foreground font-sans">Cargando gestores...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
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
                Error al cargar gestores
              </h3>
              <p className="text-sm text-muted-foreground font-sans">{error}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/95" data-aos="fade-right">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl shadow-sm">
            <svg
              className="w-7 h-7 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div>
            <CardTitle className="font-heading text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Seleccionar Gestor
            </CardTitle>
            <CardDescription className="font-sans text-base">
              Elige el gestor que enviará los mensajes masivos
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedManager || ''} onValueChange={onManagerSelect}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {managers.map((manager) => (
              <div
                key={manager.id}
                className="flex items-center space-x-4 p-3 sm:p-5 border border-border/50 rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 hover:border-primary/30 transition-all duration-300 hover:shadow-md group"
              >
                <RadioGroupItem value={manager.id} id={manager.id} />
                <Label
                  htmlFor={manager.id}
                  className="flex-1 cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <span className="text-primary font-bold font-sans text-lg">
                        {manager.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground font-sans group-hover:text-primary transition-colors">{manager.name}</p>
                      <p className="text-sm text-muted-foreground font-sans">{manager.phone}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1 sm:space-y-2">
                    <Badge
                      variant={manager.product === 'VPH' ? 'default' : 'secondary'}
                      className="font-sans shadow-sm"
                    >
                      {manager.product}
                    </Badge>
                    <Badge variant="outline" className="font-sans text-xs border-primary/20">
                      {manager.sede}
                    </Badge>
                  </div>
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}