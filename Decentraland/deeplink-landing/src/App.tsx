import React, { useEffect, useMemo } from 'react';
import './App.css';

let launched = false

function toNumber(value: any): number {
  const num = Number(value)
  return Number.isFinite(num) ? num : 0
}

function App() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [ installed, setInstalled ] = React.useState<boolean | null>(null)
  const [x, y] = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    const position = params.get('position')
    const [x,y] = String(position || '').split(',').slice(0,2)
    return [toNumber(x), toNumber(y)] as const
  }, [])

  useEffect(() => {
    if (!launched && ref.current) {
      launched = true
      let installed = false
      const isInstalled = () => { installed = true }
      window.addEventListener('blur', isInstalled);

      const iframe = document.createElement('iframe')
      iframe.setAttribute('style', 'display: none')
      iframe.src = `dcl://position=${x},${y}`

      ref.current.appendChild(iframe)
      setTimeout(() => {
        window.removeEventListener('blur', isInstalled)
        setInstalled(installed)
      }, 500);
    }
  }, [ ref, x, y ])

  return (
    <div className="App">
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <img alt="decentraland" src="https://decentraland.org/logos/svg/color-dark-text.svg" width="863" height="144" style={{ width: '100%', height: 'auto', maxWidth: '500px' }} />
        {installed === null && <p style={{ visibility: 'hidden' }}>Loading...</p>}
        {installed === false && <p>❌ Not installed! ❌</p>}
        {installed === true && <p>✅ Installed! ✅ </p>}
      </div>
      <div ref={ref} />
    </div>
  );
}

export default App;
