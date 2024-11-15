import Header from "./_components/Header";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <>{children}</>
    </>
  );
};

export default SiteLayout;
