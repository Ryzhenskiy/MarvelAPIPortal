import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link, useNavigate } from 'react-router-dom';
const Page404 = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div>
      <ErrorMessage />
      <p
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '24px',
          textTransform: 'uppercase',
        }}
      >
        Page doesn't exist
      </p>
      <Link
        style={{
          display: 'block',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '24px',
          marginTop: '30px',
          textTransform: 'uppercase',
        }}
        onClick={goBack}
      >
        Go back
      </Link>
    </div>
  );
};

export default Page404;
