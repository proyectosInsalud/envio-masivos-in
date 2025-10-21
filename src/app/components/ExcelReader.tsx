'use client';

import { useState } from 'react';
import readXlsxFile from 'read-excel-file';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ExcelUploadCard from './ExcelUploadCard';
import ImageUploadForm from './ImageUploadForm';
import ManagersTable from './ManagersTable';
import type { ImageFormData } from '@/types';
import { sendMassives, type MassivesRequest } from '@/services/massives';

// Lista de números conectados con nombres (solo ✅)
const CONNECTED_PHONE_NUMBERS = [
  { name: "Tadeo Coordinador GOLF", number: "51941554272" },
  { name: "Francesca Arias", number: "51964317736" },
  { name: "Madelein JM Inluxury", number: "5198746418" },
  { name: "Melanny corpo JM", number: "51956725804" },
  { name: "Eliana corpo JM", number: "51956725811" },
  { name: "Roxana", number: "51993997532" },
  { name: "Lisbeth InAesthetics", number: "51953200699" },
  { name: "Yohanna JM InAesthetics", number: "51974309260" },
  { name: "Katherine -Yohanna InLuxury", number: "51997621747" },
  { name: "Rodrigo INB2B", number: "51943583887" },
  { name: "Fernando INB2B", number: "51969332494" },  
];

export default function ExcelReader() {
  const [data, setData] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [selectedManagers, setSelectedManagers] = useState<(string | number)[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // No need to fetch managers since we use hardcoded phone numbers

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if it's an Excel file
    if (!file.name.match(/\.(xlsx|xls)$/)) {
      setError('Por favor selecciona un archivo Excel (.xlsx o .xls)');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const rows = await readXlsxFile(file);
      if (rows.length === 0) {
        setError('El archivo Excel está vacío');
        return;
      }

      // First row as headers
      const headerRow = rows[0] as string[];
      if (headerRow.length < 2) {
        setError('El archivo Excel debe tener al menos 2 columnas');
        return;
      }

      // Limit to first 2 columns
      const limitedHeaders = headerRow.slice(0, 2);
      setHeaders(limitedHeaders);

      // Rest of the rows as data, limited to first 2 columns
      // Filter out rows that don't have both columns complete
      const dataRows = rows.slice(1)
        .map(row => row.slice(0, 2).map(cell => cell?.toString().trim() || ''))
        .filter(row => row[0].length > 0 && row[1].length > 0);
      setData(dataRows);
    } catch (err) {
      setError('Error al leer el archivo Excel. Asegúrate de que sea un archivo válido.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onImageSubmit = (data: ImageFormData) => {
    setUploadedFile(data.image);
    const isPDF = data.image.type === 'application/pdf';

    if (!isPDF) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(data.image);
    } else {
      setImage(null); // No mostrar preview para PDFs
    }
  };

  const handleFinalSubmit = async () => {
    // Validaciones
    if (data.length === 0) {
      alert('Por favor, sube un archivo Excel primero.');
      return;
    }

    if (selectedManagers.length === 0) {
      alert('Por favor, selecciona al menos un número.');
      return;
    }

    // El archivo es opcional ahora

    // Verificar que haya al menos una fila válida después del filtrado
    const validContacts = data
      .map(row => ({
        destinationNumber: row[0]?.toString().trim() || '',
        message: row[1]?.toString().trim() || ''
      }))
      .filter(contact =>
        contact.destinationNumber.length > 0 &&
        contact.message.length > 0
      );

    if (validContacts.length === 0) {
      alert('No hay filas válidas en el Excel. Cada fila debe tener número de teléfono y mensaje.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar datos para la API - filtrar filas que no tengan ambas columnas completas
      const contacts = data
        .map(row => ({
          destinationNumber: row[0]?.toString().trim() || '',
          message: row[1]?.toString().trim() || ''
        }))
        .filter(contact =>
          contact.destinationNumber.length > 0 &&
          contact.message.length > 0
        );

      // Usar números de teléfono conectados seleccionados
      const selectedPhoneNumbers = selectedManagers.map(index => CONNECTED_PHONE_NUMBERS[Number(index)].number).filter(Boolean);

      const massivesData: MassivesRequest = {
        contacts,
        managers: selectedPhoneNumbers.map(phoneNumber => ({
          phoneSender: phoneNumber
        }))
      };

      // Enviar a la API (archivo es opcional)
      const response = await sendMassives(massivesData, uploadedFile || undefined);

      if (response.success) {
        alert('Mensajes masivos enviados correctamente.');
        // Limpiar formulario después del éxito
        setData([]);
        setHeaders([]);
        setImage(null);
        setUploadedFile(null);
        setSelectedManagers([]);
      } else {
        alert(`Error al enviar mensajes: ${response.error || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error sending massives:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al enviar mensajes masivos';
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <ExcelUploadCard onFileUpload={handleFileUpload} />

      {loading && (
        <Card className="border-primary/20 shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary"></div>
              </div>
              <p className="mt-4 text-lg text-muted-foreground font-sans">Procesando archivo Excel...</p>
              <p className="text-sm text-muted-foreground/70 font-sans mt-2">
                Esto puede tomar unos segundos
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
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
                  Error al procesar el archivo
                </h3>
                <p className="text-sm text-muted-foreground font-sans">{error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {data.length > 0 && (
        <>
          <Card className="border-primary/20 shadow-lg" data-aos="zoom-in">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <svg
                    className="w-6 h-6 text-accent-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div>
                  <CardTitle className="font-heading text-2xl">Datos Procesados</CardTitle>
                  <CardDescription className="font-sans text-base">
                    {data.length} fila{data.length !== 1 ? 's' : ''} encontrada{data.length !== 1 ? 's' : ''}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <div className={`overflow-y-auto ${data.length > 10 ? 'max-h-96' : ''}`}>
                    <table className="min-w-full divide-y divide-border">
                      <thead className="bg-muted/80 backdrop-blur-sm sticky top-0 z-10 border-b border-border/50">
                        <tr>
                          {headers.map((header, index) => (
                            <th
                              key={index}
                              className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider font-sans bg-muted/80 backdrop-blur-sm"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-card divide-y divide-border">
                        {data.map((row, rowIndex) => (
                          <tr key={rowIndex} className="hover:bg-muted/30 transition-colors">
                            {row.map((cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                className="px-6 py-4 whitespace-nowrap text-sm text-foreground font-sans"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                {data.length > 10 && (
                  <div className="px-6 py-3 bg-muted/30 border-t border-border/50">
                    <p className="text-sm text-muted-foreground font-sans">
                      Mostrando {data.length} filas • Desplázate para ver más
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <ImageUploadForm
            onImageSubmit={onImageSubmit}
            image={image}
          />

          <ManagersTable
            selectedManagers={selectedManagers}
            onManagerSelect={setSelectedManagers}
          />

          <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/95" data-aos="fade-up" data-aos-delay="200">
            <CardContent className="pt-6">
              <div className="text-center">
                <Button
                  onClick={handleFinalSubmit}
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      Enviar Mensajes Masivos
                    </>
                  )}
                </Button>
                <p className="text-sm text-muted-foreground font-sans mt-3">
                  Los mensajes serán enviados a través de la plataforma de mensajería
                </p>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {data.length === 0 && !loading && !error && (
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
                No hay datos para mostrar
              </h3>
              <p className="text-muted-foreground font-sans max-w-md mx-auto">
                Sube un archivo Excel para comenzar a procesar tus datos y agregar imágenes complementarias
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}