'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import type { ImageFormData } from '@/types';

interface ImageUploadFormProps {
  onImageSubmit: (data: ImageFormData) => void;
  image: string | null;
}

export default function ImageUploadForm({ onImageSubmit, image }: ImageUploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (selectedFile) {
      // Validar archivo
      if (selectedFile.size > 2 * 1024 * 1024) {
        setError('La imagen debe ser de máximo 2MB');
        return;
      }
      if (!selectedFile.type.startsWith('image/')) {
        setError('Por favor selecciona un archivo de imagen válido');
        return;
      }

      setError('');
      onImageSubmit({ image: selectedFile });
    }
  }, [selectedFile, onImageSubmit]);

  return (
    <Card className="border-secondary/20 shadow-lg" data-aos="fade-left">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <svg
              className="w-6 h-6 text-secondary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <CardTitle className="font-heading text-2xl">Agregar Imagen</CardTitle>
            <CardDescription className="font-sans text-base">
              Sube una imagen complementaria de máximo 2MB
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setSelectedFile(file);
                }
              }}
              className="hidden"
              id="image-input"
            />
            <label
              htmlFor="image-input"
              className="cursor-pointer flex flex-col items-center space-y-3"
            >
              <div className="p-4 bg-primary/10 rounded-full">
                <svg
                  className="w-8 h-8 text-primary"
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
                <p className="text-lg font-medium text-foreground font-sans">
                  Haz clic para seleccionar una imagen
                </p>
                <p className="text-sm text-muted-foreground font-sans">
                  o arrastra y suelta aquí
                </p>
              </div>
            </label>
          </div>
          {error && (
            <div className="flex items-center space-x-2 text-destructive">
              <svg
                className="w-4 h-4"
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
              <p className="text-sm font-sans">{error}</p>
            </div>
          )}
        </div>
        {image && (
          <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border/50">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-accent/10 rounded-full">
                <svg
                  className="w-4 h-4 text-accent-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-foreground font-sans">
                Imagen subida correctamente
              </p>
            </div>
            <Image
              src={image}
              alt="Imagen subida por el usuario"
              width={400}
              height={300}
              className="max-w-sm h-auto rounded-lg shadow-md border border-border/50"
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}