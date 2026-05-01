import { useState } from 'react';
import { Skeleton } from 'primereact/skeleton';

export default function SafeImage ({ src, alt, className, style }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden bg-slate-200 rounded-lg" style={style}>
      {!isLoaded && (
        <Skeleton style={style}></Skeleton>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        // Чтобы картинка не вылезала за границы контейнера в 150px
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
};