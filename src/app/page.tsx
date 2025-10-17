import ExcelReader from "./components/ExcelReader";
import AppHeader from "./components/AppHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <AppHeader />
        <ExcelReader />
      </div>
    </div>
  );
}
