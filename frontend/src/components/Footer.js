import { Route } from 'react-router-dom';

function Footer() {
  return(
    <Route exact path="/">
      <footer className="footer">
        <p className="footer__data">&copy; {new Date().getFullYear()} Mesto Russia</p>
      </footer>
    </Route>
  );
}

export default Footer;
