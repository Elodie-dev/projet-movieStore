import React from "react";

const Footer = () => {
  return (
    <footer class="footer page-footer footer-light">
      <div class="container">
        <ul class="list-unstyled list-inline text-center">
          <li class="list-inline-item">
            <a
              class="btn-floating btn-fb mx-1"
              href="https://github.com"
            >
              <i class="fa fa-github fa-lg"> </i>
            </a>
          </li>
          <li class="list-inline-item">
            <a
              class="btn-floating btn-tw mx-1"
              href="http://twitter.com"
            >
              <i class="fa fa-twitter fa-lg"> </i>
            </a>
          </li>
          <li class="list-inline-item">
            <a
              class="btn-floating btn-li mx-1"
              href="https://www.linkedin.com"
            >
              <i class="fa fa-linkedin fa-lg"> </i>
            </a>
          </li>
          <li class="list-inline-item">
            <a
              class="btn-floating btn-li mx-1"
              href="https://wa.me"
            >
              <i class="fa fa-whatsapp fa-lg"> </i>
            </a>
          </li>
        </ul>
      </div>
      <div class="footer-copyright text-center text text-secondary">
        © : NewFlix
      </div>
    </footer>
  );
};

export default Footer;
