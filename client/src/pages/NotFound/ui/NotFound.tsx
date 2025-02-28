export function NotFound(): React.JSX.Element {
  return (
    <div>
      <img src="/Dasha.jpg" style={{ width: '100%', display: 'block' }} />
      <h1
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, 100%)',
          color: 'ffffff',
          fontSize: '120px',
          textAlign: 'center',
          padding: '10px',
        }}
      >
        Главную страницу
      </h1>
    </div>
  );
}
