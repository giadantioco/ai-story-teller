import style from "./Header.module.scss";

interface HeaderProps {
  title: string;
}

function Header(props: HeaderProps) {
  const { title } = props;
  return (
    <div className={style.main}>
      <h1>{title}</h1>
      <button>Login</button>
    </div>
  );
}

export default Header;
