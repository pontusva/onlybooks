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

interface Code {
  id: string;
  title: string;
  code: string;
}

interface GroupedCodes {
  [title: string]: Code[];
}

export const GeneratedCodes = () => {
  const [codes, setCodes] = useState<Code[]>([]);
  const authorId = useAuthorIdStore((state) => state.authorId);
  const groupedCodes: GroupedCodes = codes.reduce(
    (acc: GroupedCodes, code: Code) => {
      if (!acc[code.title]) {
        acc[code.title] = [];
      }
      acc[code.title].push(code);
      return acc;
    },
    {} as GroupedCodes
  );

  useEffect(() => {
    if (!authorId) return;
    (async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/author/${authorId}/codes`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setCodes(result);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    })();
  }, [authorId]);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <List style={{ padding: "10px" }}>
      {Object.keys(groupedCodes).map((title) => (
        <Fragment key={title}>
          <Typography variant="h6" align="center" gutterBottom>
            {title}
          </Typography>
          {groupedCodes[title].map((code) => (
            <Fragment key={code.id}>
              <ListItem>
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
            </Fragment>
          ))}
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};
