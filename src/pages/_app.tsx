import "@/styles/globals.scss";
import localFont from "next/font/local";
import { Fraunces, DM_Mono } from "next/font/google";
import type { AppProps } from "next/app";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";

const sans = localFont({
  src: "../fonts/SUSE-VariableFont_wght.ttf",
  weight: "100 800",
  variable: "--font-sans",
});

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const locale = router.locale;

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={pageProps.messages}
      timeZone="Europe/Rome"
    >
      <div className={`app ${sans.variable}`}>
        <Component {...pageProps} />
      </div>
    </NextIntlClientProvider>
  );
}
