import { useEffect, useState } from "react";

export function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  
  useEffect(() => {
    const ob = new IntersectionObserver(
      (entries) => {
        const v = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (v[0]) setActive(v[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) ob.observe(el);
    });
    
    return () => ob.disconnect();
  }, [ids]);
  
  return active;
}

