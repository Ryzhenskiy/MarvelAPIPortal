import ComicsList from '../comicsList/ComicsList';
import AppBanner from '../appBanner/AppBanner';
import { Outlet, useOutlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const ComicsPage = () => {
  const outlet = useOutlet();
  return (
    <>
      <Helmet>
        <meta name="description" content="Page with list of comics" />
        <title>Comics page</title>
      </Helmet>
      {outlet ? (
        <>
          <AppBanner />
          <Outlet />
        </>
      ) : (
        <ComicsList />
      )}
    </>
  );
};

export default ComicsPage;
