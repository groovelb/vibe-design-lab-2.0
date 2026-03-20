import { useGrain } from './useGrain';
import './codegen.css';

export function CodegenDecorator({ children, showGlobalGrain = true, padding = 32, theme = 'purple' }) {
  const { light, dark } = useGrain();

  return (
    <div
      className="cg-root"
      data-theme={theme}
      style={{
        '--grain-light': light ? `url(${light})` : 'none',
        '--grain-dark': dark ? `url(${dark})` : 'none',
        padding,
        minHeight: '100vh',
      }}
    >
      {children}
      {showGlobalGrain && light && <div className="cg-global-grain" />}
    </div>
  );
}
