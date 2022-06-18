import { useState } from 'react';
import CountryInfo from './CountryInfo';

export default function Country({ country }) {
  const [show, setShow] = useState(false);

  if (typeof country === "undefined") return;

  return (
    <li>
      <span style={{ display: 'flex' }}>
        <p>{country.name.common}</p>
        <button
          style={{ height: 'min-content', alignSelf: 'center' }}
          onClick={() => setShow(!show)}>
          Show
        </button>
      </span>

      <div style={{ display: show ? 'block' : 'none' }}>
        <CountryInfo country={country} />
      </div>
    </li>
  )
}