import { useGrain } from './useGrain';
import './codegen.css';

const STEPS = [
  { num: '01', title: 'Connect', desc: 'Link your GitHub repositories. Codegen indexes your full codebase \u2014 every file, every dependency, every relationship.' },
  { num: '02', title: 'Configure', desc: 'Set up your agent with fine-grained permission toggles. Control exactly what actions agents can take across your codebase.' },
  { num: '03', title: 'Deploy', desc: 'Run agents at scale. Smart routing ensures the best model handles each task with production-ready results.' },
];

export function FrostedSteps() {
  const { dark } = useGrain();

  return (
    <div>
      <div className="cg-label">S7 — Frosted Step Cards</div>
      <h2 className="cg-title">Light Gradient + Semi-transparent</h2>
      <p className="cg-desc">
        라이트 그래디언트 위의 반투명 카드(<code>#FDFDFC66</code>)와 그래디언트 넘버 서클 + 타임라인.
      </p>

      <div className="cg-frosted">
        {dark && <div className="cg-frosted-grain" style={{ backgroundImage: `url(${dark})` }} />}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {STEPS.map((step, i) => (
            <div className="cg-step" key={step.num}>
              <div className="cg-step-left">
                <div className="cg-step-num">{step.num}</div>
                {i < STEPS.length - 1 && <div className="cg-step-line" />}
              </div>
              <div className="cg-step-card">
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
