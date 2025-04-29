import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage, urlForImage } from "@/sanity/lib/utils";
import { toPlainText } from "next-sanity";
import { handleError } from "./client-utils";

import type { Metadata } from "next";
import MotionLayout from "./components/MotionLayout";
import { LanguageProvider } from "./context/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import LanguageSwitcher from "./components/LanguageSwitcher";
import NavLinks from "./components/NavLinks";
import MobileNav from "./components/MobileNav";

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    stega: false,
  });

  const title = settings?.siteTitle || "Alventosa Morell";
  const description = settings?.description
    ? toPlainText(settings.description)
    : "Default description";
  const ogImage = resolveOpenGraphImage(settings?.ogImage);

  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch (e) {
    console.error("Invalid metadataBase URL in settings", e);
  }

  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    stega: false,
  });

  const logoUrl = settings?.logo ? urlForImage(settings.logo)?.url() : null;
  const navLinks = settings?.navLinks || [];
  const languages = settings?.languages || ["ca", "es", "en"];

  return (
    <html lang="ca">
      <body className="font-soehne bg-white text-black overflow-x-hidden">
        <LanguageProvider>
          <SanityLive onError={handleError} />
          <MotionLayout>
            {logoUrl && (
              <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
                <Link href="/">
                  <Image
                    src={logoUrl}
                    alt="Alventosa Morell Arquitectes"
                    width={75}
                    height={16}
                    className="object-contain h-5 w-auto mix-blend-overlay z-50"
                    priority
                    unoptimized
                  />
                </Link>
              </div>
            )}

            <NavLinks navLinks={navLinks} />
            <MobileNav navLinks={navLinks} languages={languages} />

            <main className="min-h-screen flex flex-col">{children}</main>
          </MotionLayout>

          <SpeedInsights />
        </LanguageProvider>
      </body>
    </html>
  );
}
