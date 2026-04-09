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
      {/* Spacer for Nav */}
      <div className="pt-32 pb-20 mesh-bg-navy min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="orb orb-amber w-[500px] h-[500px] -top-32 -right-32 animate-pulse-glow" />

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-bg mb-4">{title}</h1>
            <p className="text-amber-500 font-mono text-sm tracking-wider">LAST UPDATED: {updated.toUpperCase()}</p>
          </div>

          <div className="glass-dark rounded-3xl p-8 md:p-12 border border-amber-500/20 
                        [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-amber-500 [&_h2]:mt-10 [&_h2]:mb-4 
                        [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-amber-400 [&_h3]:mt-8 [&_h3]:mb-3 
                        [&_p]:text-bg/80 [&_p]:mb-6 [&_p]:leading-relaxed
                        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2
                        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2
                        [&_li]:text-bg/80 [&_li]:leading-relaxed
                        [&_a]:text-amber-500 [&_a]:underline [&_a:hover]:text-amber-400
                        [&_strong]:text-bg [&_strong]:font-semibold">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
