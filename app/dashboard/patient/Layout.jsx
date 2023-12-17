import Navigation from "./Navigation";

const Layout = ({ children }) => {
  return (
    <main>
      {children}
      <Navigation />
    </main>
  );
};

export default Layout;
