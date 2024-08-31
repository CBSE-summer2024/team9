import { useEffect, useRef } from "react";
import { SvelteComponent } from "svelte";

type SvelteWrapperProps = {
  component: typeof SvelteComponent;
};

export function SvelteWrapper({ component }: SvelteWrapperProps) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (containerRef.current) {
      const svelteInstance = new component({
        target: containerRef.current,
      });

      return () => {
        svelteInstance.$destroy();
      };
    }
  }, []);

  return <div ref={containerRef}></div>;
}
