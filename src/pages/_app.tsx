import "@/styles/globals.scss";
import localFont from "next/font/local";
import type { AppProps } from "next/app";
import { NextIntlClientProvider } from "next-intl";
import { useRouter } from "next/router";

const suse = localFont({
  src: "../fonts/SUSE-VariableFont_wght.ttf",
  weight: "100 800",
  variable: "--font-suse",
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
      <div className={`app ${suse.variable}`}>
        <Component {...pageProps} />
      </div>
    </NextIntlClientProvider>
  );
}
