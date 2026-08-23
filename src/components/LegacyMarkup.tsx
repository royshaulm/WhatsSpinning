type Props = { html: string; className?: string };

/** Compatibility bridge for pixel-perfect legacy markup. */
export function LegacyMarkup({ html, className = 'legacy-fragment' }: Props) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
