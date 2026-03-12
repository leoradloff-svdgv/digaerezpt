import digas from "@/data/digas.json";
import { DiGASearch } from "@/components/DiGASearch";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex min-h-[85vh] flex-col items-center justify-center px-4">
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
            Welche DiGA haben Sie verschrieben bekommen?
          </h1>
        </div>

        <DiGASearch digas={digas} />
      </main>

      <section className="px-4 pb-16">
        <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {digas.map((diga) => {
            const Wrapper = diga.url ? "a" : "div";
            const linkProps = diga.url
              ? { href: diga.url, target: "_blank" as const, rel: "noopener noreferrer" }
              : {};
            return (
              <Wrapper
                key={diga.id}
                {...linkProps}
                className={`flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 text-center transition-shadow ${
                  diga.url ? "hover:shadow-md" : "opacity-60 cursor-default"
                }`}
              >
                <Image
                  src={diga.logo}
                  alt=""
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
                <span className="text-xs font-medium text-gray-700 line-clamp-2">
                  {diga.name}
                </span>
              </Wrapper>
            );
          })}
        </div>

        <footer className="mt-16 w-full text-center text-xs text-gray-400">
          <p>
            Spitzenverband Digitale Gesundheitsversorgung e.V.
            <span className="mx-1.5">·</span>
            <Link
              href="https://www.digitalversorgt.de/rechtliches/impressum"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-600 transition-colors"
            >
              Impressum
            </Link>
          </p>
        </footer>
      </section>
    </>
  );
}
