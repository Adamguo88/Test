import { useEffect, useState } from "react";

export function useWatchForm(isData) {
  const [isRelation, setIsRelation] = useState([]);
  useEffect(() => {
    if (isData?.length >= 1) {
      const findRelation = isData.filter((item) => item.relation);
      setIsRelation(findRelation);
    }
  }, [isData]);
  return { relation: isRelation };
}
