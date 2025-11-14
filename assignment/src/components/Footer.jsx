import React from "react";

function Footer() {
  return (
    <footer className="text-center mt-4 p-3 bg-dark text-light">
      © {new Date().getFullYear()} Personal Budget Management
    </footer>
  );
}

export default Footer;
