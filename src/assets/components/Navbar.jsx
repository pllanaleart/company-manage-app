import "./Navbar.css";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import LogoSvg from "../svg/logo.svg";
import HomeSvg from "../svg/home.svg";
import StockSvg from "../svg/stock.svg";
import ProductSvg from "../svg/products.svg";
import SellSvg from "../svg/sell.svg";
import PurchaseSvg from "../svg/purchase.svg";
import InvoiceSvg from "../svg/invoice.svg";
import EmployeeSvg from "../svg/employee.svg";
import AboutSvg from "../svg/about.svg";

function Navbar() {
  return (
    <nav id="sidebar-container">
      <Link to="/">
        <img src={LogoSvg} alt="logo" />
        Plan-A
      </Link>
      <hr />
      <ul>
        <CostumLink to="/home" imgLogo={HomeSvg}>
          Home
        </CostumLink>
        <CostumLink to="/products" imgLogo={ProductSvg}>
          Products
        </CostumLink>
        <CostumLink to="/stock" imgLogo={StockSvg}>
          Stock
        </CostumLink>
        <CostumLink to="/sellings" imgLogo={SellSvg}>
          Sellings
        </CostumLink>
        <CostumLink to="/purchases" imgLogo={PurchaseSvg}>
          Purchases
        </CostumLink>
        <CostumLink to="/invoices" imgLogo={InvoiceSvg}>
          Invoices
        </CostumLink>
        <CostumLink to="/employees" imgLogo={EmployeeSvg}>
          Employees
        </CostumLink>
      </ul>
      <hr className="hr-specs" />
      <ul>
        <CostumLink to="/about" imgLogo={AboutSvg}>
          About
        </CostumLink>
      </ul>
      <hr className="hr2-specs" />
    </nav>
  );
}

function CostumLink({ to, children, imgLogo, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        <img src={imgLogo} alt="icon" /> {children}
      </Link>
    </li>
  );
}

export default Navbar;
