import { useState, useEffect } from 'react';
import { List, AutoSizer, WindowScroller } from 'react-virtualized';
import { useSelector } from 'react-redux';

export default function VirtualList({
  items,
  rowHeight = 100,
  renderItem,
  className = '',
  overscanRowCount = 10
}) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const enableVirtualization = useSelector(
    state => state.settings.performance.enableVirtualization
  );

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (!enableVirtualization) {
    return (
      <div className={className}>
        {items.map((item, index) => renderItem({ item, index }))}
      </div>
    );
  }

  return (
    <WindowScroller>
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              autoHeight
              height={height}
              width={width}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              scrollTop={scrollTop}
              rowCount={items.length}
              rowHeight={rowHeight}
              rowRenderer={({ index, key, style }) => (
                <div key={key} style={style}>
                  {renderItem({ item: items[index], index })}
                </div>
              )}
              overscanRowCount={overscanRowCount}
              className={className}
            />
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
}