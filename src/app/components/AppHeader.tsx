import Image from "next/image";

export default function AppHeader() {
  return (
    <div className="text-center mb-12" data-aos="fade-down">
      <div className="flex items-center justify-center mb-6" data-aos="fade-right" data-aos-delay="200">
        <Image
          src="/svg/logo.svg"
          alt="Logo"
          width={48}
          height={48}
          className="w-32 h-12 mr-3"
        />
        <h1 className="text-4xl font-bold text-foreground font-heading bg-gradient-to-r from-primary to-accent bg-clip-text">
          Envío de Mensajes Masivos
        </h1>
      </div>
      <p className="text-lg text-muted-foreground font-sans max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="400">
        Sube un archivo Excel y agrega imágenes complementarias para enviar mensajes personalizados de manera eficiente
      </p>
    </div>
  );
}