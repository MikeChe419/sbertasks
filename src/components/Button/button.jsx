import s from './index.module.css';
import cn from 'classnames';

function Button({ type, children, className }) {

  return (
    <button className={cn(
      s.button,
      {
        [s.primary]: type === 'primary',
        [s.secondary]: type === 'secondary',
      },
      className
    )}>
      {children}
    </button>
  )
}

export default Button;
