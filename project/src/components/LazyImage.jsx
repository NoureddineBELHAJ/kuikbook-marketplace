import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

export default function LazyImage({
  src,
  alt,
  className = '',
  placeholderSrc = '',
  blur = true,
  threshold = 0.1
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { ref, inView } = useInView({ threshold });
  const enableLazyLoading = useSelector(
    state => state.settings.performance.imageLazyLoading
  );

  useEffect(() => {
    if (inView && !isLoaded && !error && enableLazyLoading) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [inView, src, isLoaded, error, enableLazyLoading]);

  if (!enableLazyLoading) {
    return <img src={src} alt={alt} className={className} />;
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <AnimatePresence>
        {!isLoaded && !error && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-200 animate-pulse"
          >
            {placeholderSrc && (
              <img
                src={placeholderSrc}
                alt={alt}
                className={`w-full h-full object-cover ${
                  blur ? 'filter blur-sm' : ''
                }`}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {(inView || isLoaded) && !error && (
        <motion.img
          src={src}
          alt={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`w-full h-full object-cover ${
            !isLoaded ? 'invisible' : ''
          }`}
        />
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-sm text-gray-500">Failed to load image</span>
        </div>
      )}
    </div>
  );
}