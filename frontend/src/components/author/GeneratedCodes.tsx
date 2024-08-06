import { useEffect, useState, Fragment } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import { useAuthorIdStore } from "../../zustand/authorIdStore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  query,
  collection,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../auth/initAuth";

interface Code {
  id: string;
  title: string;
  code: string;
  is_redeemed: boolean;
}

interface GroupedCodes {
  [title: string]: Code[];
}

export const GeneratedCodes = () => {
  const [codes, setCodes] = useState<DocumentData>([]);
  const [loading, setLoading] = useState(true);
  const authorId = useAuthorIdStore((state) => state.authorId);

  const groupedCodes: GroupedCodes | null =
    codes.length > 0
      ? codes.reduce((acc: GroupedCodes, code: Code) => {
          if (!code.is_redeemed) {
            if (!acc[code.title]) {
              acc[code.title] = [];
            }
            acc[code.title].push(code);
          }
          return acc;
        }, {} as GroupedCodes)
      : null;

  useEffect(() => {
    if (!authorId) return;
    (async () => {
      const q = query(
        collection(db, "PurchaseCodes"),
        where("author_id", "==", authorId)
      );
      const codesArray: DocumentData[] = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document) => {
        codesArray.push(document.data());
      });
      setCodes(codesArray);
    })();
    setLoading(false);
  }, [authorId]);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    !loading &&
    groupedCodes && (
      <List style={{ padding: "10px" }}>
        {Object.keys(groupedCodes).map((title) => (
          <Fragment key={title}>
            <Typography variant="h6" align="center" gutterBottom>
              {title}
            </Typography>
            {groupedCodes[title].map((code) => (
              <ListItem key={`${title}-${code.id}`}>
                <ListItemText secondary={code.code} />
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => handleCopy(code.code)}
                  startIcon={<ContentCopyIcon />}
                >
                  Copy
                </Button>
              </ListItem>
            ))}
            <Divider />
          </Fragment>
        ))}
      </List>
    )
  );
};
