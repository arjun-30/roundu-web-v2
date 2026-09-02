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
      <div className="pt-32 pb-20 bg-slate-950 min-h-screen relative overflow-hidden text-slate-100">
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">{title}</h1>
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider">Last updated: {updated}</p>
          </div>

          <div className="surface-card rounded-2xl p-6 md:p-10 border border-slate-800 
                        [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-amber-400 [&_h2]:mt-8 [&_h2]:mb-3 
                        [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-amber-300 [&_h3]:mt-6 [&_h3]:mb-2 
                        [&_p]:text-slate-300 [&_p]:mb-5 [&_p]:leading-relaxed [&_p]:text-sm
                        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-5 [&_ul]:space-y-2 [&_ul]:text-sm
                        [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-5 [&_ol]:space-y-2 [&_ol]:text-sm
                        [&_li]:text-slate-300 [&_li]:leading-relaxed
                        [&_a]:text-amber-400 [&_a]:underline [&_a:hover]:text-amber-300
                        [&_strong]:text-white [&_strong]:font-semibold">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
