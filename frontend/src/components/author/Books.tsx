import { useEffect, useState } from "react";
import { useUidStore } from "../../zustand/userStore";

export const Books = () => {
  const uid = useUidStore((state) => state.uid);
  const [isAuthor, setIsAuthor] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (!uid) return;
      const response = await fetch(`http://localhost:3000/author/${uid}`);
      const result = await response.json();
      setIsAuthor(result.is_author);
    })();
  }, [uid]);

  return (
    isAuthor && (
      <div>
        <h1>Books</h1>
      </div>
    )
  );
};
