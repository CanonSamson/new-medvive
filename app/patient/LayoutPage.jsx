import Navigation from "./Navigation";

const LayoutPage = ({ children }) => {
  return (
    <main>
      {children}
      <Navigation />
    </main>
  );
};

export default LayoutPage;
