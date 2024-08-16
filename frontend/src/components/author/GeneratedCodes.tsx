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
import { useGetPurchaseCodes } from "../../data/authors/useGetPurchaseCodes";

interface Code {
  id?: string;
  title: string;
  code: string;
  is_redeemed: boolean;
}

interface GroupedCodes {
  [title: string]: Code[];
}

export const GeneratedCodes = () => {
  const [codes, setCodes] = useState<Code[]>([]);
  const authorId = useAuthorIdStore((state) => state.authorId);

  const { purchaseCodes, loading } = useGetPurchaseCodes({
    authorId: authorId || "",
  });

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
    if (!authorId || !purchaseCodes) return;
    setCodes(purchaseCodes);
  }, [purchaseCodes]);

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
