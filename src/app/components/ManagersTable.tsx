'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CONNECTED_PHONE_NUMBERS } from '@/lib/constants';

interface ManagersTableProps {
  selectedManagers: (string | number)[];
  onManagerSelect: (managerIds: (string | number)[]) => void;
}

export default function ManagersTable({ selectedManagers, onManagerSelect }: ManagersTableProps) {
  const handleManagerToggle = (index: number) => {
    const isSelected = selectedManagers.includes(index);
    if (isSelected) {
      onManagerSelect(selectedManagers.filter(id => id !== index));
    } else {
      onManagerSelect([...selectedManagers, index]);
    }
  };

  const handleSelectAll = () => {
    if (selectedManagers.length === CONNECTED_PHONE_NUMBERS.length) {
      onManagerSelect([]);
    } else {
      onManagerSelect(CONNECTED_PHONE_NUMBERS.map((_, index) => index));
    }
  };

  // No loading or error states needed since data is hardcoded

  return (
    <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/95" data-aos="fade-right">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
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
                Seleccionar Números
              </CardTitle>
              <CardDescription className="font-sans text-base">
                Elige los números desde donde se enviarán los mensajes masivos
              </CardDescription>
            </div>
          </div>
          <Button
            onClick={handleSelectAll}
            variant="outline"
            size="sm"
            className="font-sans"
          >
            {selectedManagers.length === CONNECTED_PHONE_NUMBERS.length ? 'Deseleccionar Todos' : 'Seleccionar Todos'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pr-2">
            {CONNECTED_PHONE_NUMBERS.map((contact, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-3 sm:p-5 border border-border/50 rounded-xl hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 hover:border-primary/30 transition-all duration-300 hover:shadow-md group"
              >
                <Checkbox
                  id={index.toString()}
                  checked={selectedManagers.includes(index)}
                  onCheckedChange={() => handleManagerToggle(index)}
                />
                <Label
                  htmlFor={index.toString()}
                  className="flex-1 cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <span className="text-primary font-bold font-sans text-lg">
                        📱
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground font-sans group-hover:text-primary transition-colors">{contact.name}</p>
                      <p className="text-sm text-muted-foreground font-sans">{contact.number}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1 sm:space-y-2">
                    {/* <Badge
                      variant="default"
                      className="font-sans shadow-sm"
                    >
                      Gestor
                    </Badge> */}
                    {/* <Badge variant="outline" className="font-sans text-xs border-primary/20">
                      {manager.username}
                    </Badge> */}
                  </div>
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}