import { ListItem, ListItemText } from "@mui/material";

const InfoTextCard = ({ label, value }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={value}
          secondary={
            <span
              style={{
                fontSize: "0.7rem",
              }}
            >
              {label}
            </span>
          }
        />
      </ListItem>
    </>
  );
};

export default InfoTextCard;
