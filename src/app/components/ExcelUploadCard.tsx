'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ExcelUploadCardProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ExcelUploadCard({ onFileUpload }: ExcelUploadCardProps) {
  return (
    <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-card/95" data-aos="fade-up">
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
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div>
            <CardTitle className="font-heading text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Cargar Archivo Excel
            </CardTitle>
            <CardDescription className="font-sans text-base">
              Selecciona un archivo Excel (.xlsx o .xls) para procesar sus datos
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-primary/30 rounded-xl p-10 text-center hover:border-primary/60 hover:bg-primary/5 transition-all duration-300 group">
            <input
              id="excel-file"
              type="file"
              accept=".xlsx,.xls"
              onChange={onFileUpload}
              className="hidden"
            />
            <label
              htmlFor="excel-file"
              className="cursor-pointer flex flex-col items-center space-y-4"
            >
              <div className="p-5 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg
                  className="w-10 h-10 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xl font-semibold text-foreground font-sans group-hover:text-primary transition-colors">
                  Haz clic para seleccionar un archivo Excel
                </p>
                <p className="text-sm text-muted-foreground font-sans mt-1">
                  o arrastra y suelta aquí
                </p>
              </div>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}