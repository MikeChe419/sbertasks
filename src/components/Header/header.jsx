import s from './index.module.css';
import cn from 'classnames';


function Header({children}) {
  return (
    <header className={cn(s.header,'cover')}>
      <div className="container">
        <div className={s.wrapper}>
          {children}
        </div>
      </div>
    </header>
  )
}

export default Header;
