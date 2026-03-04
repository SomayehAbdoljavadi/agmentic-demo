const Footer = () => {
  return (
    <footer className="px-6 md:px-12 lg:px-20 py-10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <svg width="20" height="20" viewBox="0 0 28 28" fill="none" className="text-primary">
          <path d="M14 2L2 8L14 14L26 8L14 2Z" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M2 20L14 26L26 20" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M2 14L14 20L26 14" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
        <span className="text-sm text-muted-foreground">Agmentic</span>
      </div>
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
        <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
      </div>
    </footer>
  );
};

export default Footer;
