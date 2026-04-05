export default function WindowFrame({ title, children, className = '' }) {
  return (
    <div className={`window-frame ${className}`}>
      <div className="window-frame__header">
        <span className="window-dot window-dot--red"  aria-hidden="true" />
        <span className="window-dot window-dot--yellow" aria-hidden="true" />
        <span className="window-dot window-dot--green"  aria-hidden="true" />
        {title && <span className="window-frame__title">{title}</span>}
      </div>
      <div className="window-frame__body">
        {children}
      </div>
    </div>
  );
}
