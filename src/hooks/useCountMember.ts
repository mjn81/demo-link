import { useEffect, useState } from "react";

export const useCountMember = (members: any) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!members) return;
    const c = members.length;
    if (c > 6) {
      setCount(7);
    }
    else {
      setCount(c);
    }
    
  }, [members]);
  return count;
}