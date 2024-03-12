type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="max-w-7xl m-auto">
      <div className="w-full border border-t-0 border-l-0 border-r-0 border-b-stone-400 p-6">
        <h1 className="text-white text-3xl font-bold">Pokedex</h1>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Layout;
