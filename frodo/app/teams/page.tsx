export default function TeamsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Teams</h1>
        <p className="text-muted-foreground mt-2">
          Takımları görüntüleyin ve yönetin
        </p>
      </div>
      
      <div className="mt-8">
        <div className="border border-border rounded-lg p-6 bg-card">
          <p className="text-muted-foreground text-center py-12">
            Takım listesi yakında eklenecek...
          </p>
        </div>
      </div>
    </div>
  );
}

