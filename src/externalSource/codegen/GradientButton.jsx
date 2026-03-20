import './codegen.css';

export function GradientButton({ children, variant = 'primary', forceHover = false, disabled = false, ...props }) {
  const base = variant === 'primary' ? 'cg-btn-primary' : 'cg-btn-secondary';
  const cls = `${base}${forceHover ? ' force-hover' : ''}`;

  return (
    <button className={cls} style={disabled ? { pointerEvents: 'none' } : undefined} {...props}>
      {variant === 'primary' ? <span>{children}</span> : children}
    </button>
  );
}
