export default function Footer() {
  return (
    <footer className="w-full bg-background pt-20 pb-12 px-8 md:px-28">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative w-6 h-6 border-2 border-foreground/60 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 border border-foreground/60 rounded-full" />
            </div>
            <span className="font-bold text-lg tracking-wide uppercase">Aura</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
            Premium aesthetics engineered for the modern minimalist. Elevating daily wear through structural precision.
          </p>
        </div>

        {/* Shop */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold mb-2 uppercase tracking-widest text-xs text-muted-foreground">Shop</h4>
          {['Men', 'Women', 'Accessories', 'New Arrivals'].map(link => (
            <a key={link} href="#" className="text-sm hover:text-foreground transition-colors w-max">
              {link}
            </a>
          ))}
        </div>

        {/* Support */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold mb-2 uppercase tracking-widest text-xs text-muted-foreground">Support</h4>
          {['FAQ', 'Shipping', 'Returns', 'Contact Us'].map(link => (
            <a key={link} href="#" className="text-sm hover:text-foreground transition-colors w-max">
              {link}
            </a>
          ))}
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold mb-2 uppercase tracking-widest text-xs text-muted-foreground">Legal</h4>
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
            <a key={link} href="#" className="text-sm hover:text-foreground transition-colors w-max">
              {link}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
        <p>© 2026 Aura. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
          <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
          <a href="#" className="hover:text-foreground transition-colors">Pinterest</a>
        </div>
      </div>
    </footer>
  );
}
