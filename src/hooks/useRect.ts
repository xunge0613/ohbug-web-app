import { useState, useRef, MutableRefObject, useLayoutEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ResizeObserver from 'resize-observer-polyfill';

type Arg = HTMLElement | (() => HTMLElement) | null;

function useRect<T extends HTMLElement = HTMLElement>(): [DOMRect | undefined, MutableRefObject<T>];
function useRect<T extends HTMLElement = HTMLElement>(arg: Arg): [DOMRect | undefined];
function useRect<T extends HTMLElement = HTMLElement>(
  ...args: [Arg] | []
): [DOMRect | undefined, MutableRefObject<T>?] {
  const hasPassedInElement = args.length === 1;
  const arg = useRef(args[0]);
  [arg.current] = args;
  const element = useRef<T>();
  const [state, setState] = useState<DOMRect | undefined>();

  useLayoutEffect(() => {
    const passedInElement = typeof arg.current === 'function' ? arg.current() : arg.current;
    const targetElement = hasPassedInElement ? passedInElement : element.current;
    if (!targetElement) {
      return () => {};
    }

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target) {
          setState(entry.target.getBoundingClientRect());
        }
      });
    });

    resizeObserver.observe(targetElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, [element.current, typeof arg.current === 'function' ? undefined : arg.current]);

  if (hasPassedInElement) {
    return [state];
  }
  return [state, element as MutableRefObject<T>];
}

export default useRect;
