import './LoadingState.css';

export default function LoadingState({ count = 8 }) {
  return (
    <div className="loading-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton skeleton--image" />
          <div className="skeleton-card__body">
            <div className="skeleton skeleton--badge" />
            <div className="skeleton skeleton--title" />
            <div className="skeleton skeleton--text" />
            <div className="skeleton-card__footer">
              <div className="skeleton skeleton--price" />
              <div className="skeleton skeleton--button" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
