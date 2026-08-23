declare module '*.html?raw' { const content: string; export default content; }

interface Window { XLSX: unknown; [key: string]: unknown; }
