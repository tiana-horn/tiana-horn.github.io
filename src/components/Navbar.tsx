import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/speaking", label: "Speaking" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/50"
    >
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-heading text-xl font-bold tracking-tight text-foreground">
          Tiana M. <span className="text-primary">Horn</span>
        </Link>
        <p className="font-heading text-xl font-bold tracking-tight text-foreground" > tiana.horn@gmail.com</p>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-heading text-sm tracking-wide transition-colors hover:text-primary ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://www.linkedin.com/in/tiana-horn/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/tiana-horn"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://tianahorn.com/files/HornTianaResume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-heading text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg"
        >
          <div className="container py-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`font-heading text-sm ${location.pathname === link.to ? "text-primary" : "text-muted-foreground"}`}
              >
                {link.label}
              </Link>
            ))}
            <a href="https://www.linkedin.com/in/tiana-horn/" target="_blank" rel="noopener noreferrer" className="font-heading text-sm text-muted-foreground">LinkedIn</a>
            <a href="https://github.com/tiana-horn" target="_blank" rel="noopener noreferrer" className="font-heading text-sm text-muted-foreground">GitHub</a>
            <a href="https://tianahorn.com/files/HornTianaResume.pdf" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-heading text-sm font-medium text-center">Resume</a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
