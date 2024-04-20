import Header from './Header';  // adjust the path as needed

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      {/* footer, etc. */}
    </div>
  );
};

export default Layout;