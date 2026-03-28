const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-heading text-sm text-muted-foreground">
          © {new Date().getFullYear()} Tiana M. Horn. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a href="https://www.linkedin.com/in/tiana-horn/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">LinkedIn</a>
          <a href="https://github.com/tiana-horn" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">GitHub</a>
          <a href="mailto:tiana.horn@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
