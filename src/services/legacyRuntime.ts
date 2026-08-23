import * as XLSX from 'xlsx';

const scripts = ['/legacy/script-1.js', '/legacy/script-2.js', '/legacy/script-3.js', '/legacy/social.js', '/legacy/listening.js'];
let bootPromise: Promise<void> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-legacy-src="${src}"]`)) return resolve();
    const el = document.createElement('script');
    el.src = src;
    el.dataset.legacySrc = src;
    el.async = false;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(el);
  });
}

export function bootLegacyRuntime(): Promise<void> {
  if (bootPromise) return bootPromise;
  (window as Window & { XLSX: typeof XLSX }).XLSX = XLSX;
  bootPromise = scripts.reduce((p, src) => p.then(() => loadScript(src)), Promise.resolve());
  return bootPromise;
}
