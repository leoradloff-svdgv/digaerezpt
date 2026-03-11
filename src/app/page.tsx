import digas from "@/data/digas.json";
import { DiGASearch } from "@/components/DiGASearch";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/svdgv-icon-petrol.svg"
          alt="Spitzenverband Digitale Gesundheitsversorgung"
          width={48}
          height={48}
          className="mb-4"
          priority
        />
        <h1 className="text-xl md:text-2xl font-semibold text-center text-gray-900">
          DiGA e-Rezept einlösen
        </h1>
        <p className="text-sm text-gray-500 mt-2 text-center max-w-md">
          Wählen Sie Ihre Digitale Gesundheitsanwendung aus, um direkt
          weitergeleitet zu werden.
        </p>
      </div>

      <DiGASearch digas={digas} />

      <footer className="absolute bottom-0 w-full py-4 text-center text-xs text-gray-400">
        <p>
          Spitzenverband Digitale Gesundheitsversorgung e.V.
          <span className="mx-1.5">·</span>
          <a
            href="https://www.digitalversorgt.de/rechtliches/impressum"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600 transition-colors"
          >
            Impressum
          </a>
        </p>
      </footer>
    </main>
  );
}
