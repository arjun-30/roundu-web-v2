import Nav from './Nav';
import Footer from './Footer';

interface LegalPageProps {
  title: string;
  updated: string;
  children: React.ReactNode;
}

export default function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <>
      <Nav />
      <main className="pt-40 pb-28 min-h-screen">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 grid lg:grid-cols-12 gap-10">
          <header className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow mb-5">Last updated {updated}</p>
              <h1 className="font-serif text-navy-700 text-5xl leading-[1.05]">{title}</h1>
            </div>
          </header>

          <article
            className="lg:col-span-7 lg:col-start-6 text-ink
              [&>p:first-child]:font-serif [&>p:first-child]:font-normal [&>p:first-child]:text-2xl [&>p:first-child]:leading-snug [&>p:first-child]:text-ink
              [&_h2]:font-serif [&_h2]:font-normal [&_h2]:tracking-tight [&_h2]:text-[1.75rem] [&_h2]:text-navy-700 [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:pt-8 [&_h2]:border-t [&_h2]:border-line
              [&_h3]:font-serif [&_h3]:font-normal [&_h3]:text-xl [&_h3]:text-ink [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:text-muted [&_p]:mb-5 [&_p]:leading-[1.75] [&_p]:text-[1.0625rem]
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-6 [&_ul]:space-y-2.5 [&_ul]:marker:text-amber-700
              [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-6 [&_ol]:space-y-2.5
              [&_li]:text-muted [&_li]:leading-[1.7]
              [&_a]:text-navy-700 [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-line [&_a:hover]:decoration-navy-700
              [&_strong]:text-ink [&_strong]:font-semibold"
          >
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
