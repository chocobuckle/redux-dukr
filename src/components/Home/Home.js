import React from 'react';
import { container, title, slogan } from './styles.css';

export default function Home() {
  return (
    <div className={container}>
      <p className={title}>{'Duckr'}</p>
      <p className={slogan}>{'A real time, cloud-based, growth hacking, disrupting, modular and scalable social platform! All the buzzwords venture capitalists like! Sigh.'}</p>
    </div>
  );
}
