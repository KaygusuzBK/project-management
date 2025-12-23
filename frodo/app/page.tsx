import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex h-full items-center justify-center flex-col gap-4">
      <h1 className="text-4xl font-bold text-foreground">Welcome to Frodo</h1>
      <p className="text-muted-foreground">Fresh start with Next.js 15+ and Shadcn UI</p>
      <div className="flex gap-2">
        <Button>Click me</Button>
        <Button variant="secondary">Secondary</Button>
      </div>
    </div>
  );
}
