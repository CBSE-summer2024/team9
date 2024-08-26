import { useEffect, useRef } from "react";
import { Component, createApp } from "vue";

type VueWrapperProps = {
  component: Component;
};

export function VueWrapper({ component }: VueWrapperProps) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const vueInstance = createApp(component);
      vueInstance.mount(containerRef.current);

      return () => {
        vueInstance.unmount();
      };
    }
  }, []);

  return <div ref={containerRef}></div>;
}
