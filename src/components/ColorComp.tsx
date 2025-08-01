import "@src/shoes.scss";
import Constants from "@src/Constants";
import { Box } from "@mui/system";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { selectedColorState, selectedMeshState } from "@src/atoms/Atoms";
import { useRecoilState } from "recoil";

export default function ColorComp() {
  //recoil 사용한 전역상태 관리
  const [selectedColorIdx, setSelectedColorIdx] =
    useRecoilState(selectedColorState);

  //클릭한 부분의 이름
  const [selectedMeshName] = useRecoilState(selectedMeshState);

  // const [selected, setSelected] = useState(0);
  const padding = 16;
  const btnWidth = 30;
  const width = Constants.COLOR_ARR.length * (btnWidth + padding * 2);

  const colorClick = (color: any, idx: number) => {
    setSelectedColorIdx(idx);
  };

  return (
    <Box
      className={"color-wrapper"}
      sx={{
        position: "fixed",
        bottom: { xs: 10, sm: 20 },
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.3))",
        width: { xs: "95vw", sm: "auto", lg: "auto", xl: "auto" },
        maxWidth: { xs: "100vw", sm: "none", lg: "none", xl: "none" },
      }}
    >
      <Box
        className={"color-inner-wrap"}
        sx={{
          background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
          borderRadius: { xs: "16px", sm: "20px" },
          padding: {
            xs: "8px 8px 32px 8px",
            sm: "12px 16px 40px 16px",
          },
          boxShadow: `
            0 10px 30px rgba(0,0,0,0.15),
            inset 0 1px 0 rgba(255,255,255,0.8),
            inset 0 -1px 0 rgba(0,0,0,0.1)
          `,
          border: "1px solid rgba(255,255,255,0.5)",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s ease",
          width: "100%",
          maxWidth: { xs: "100vw", sm: "none", lg: "none", xl: "1800px" },
          minWidth: { xs: "auto", sm: "auto", lg: "auto", xl: "auto" },
          overflowX: {
            xs: "auto",
            sm: "visible",
            lg: "visible",
            xl: "visible",
          },
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: `
              0 15px 40px rgba(0,0,0,0.2),
              inset 0 1px 0 rgba(255,255,255,0.9),
              inset 0 -1px 0 rgba(0,0,0,0.1)
            `,
          },
        }}
      >
        <Typography
          className={"current-part"}
          sx={{
            fontWeight: "bold !important",
            textAlign: "center",
            color: "#333",
            textShadow: "0 1px 2px rgba(255,255,255,0.8)",
            fontSize: { xs: "0.9rem", sm: "1rem" },
            lineHeight: 1.2,
          }}
        >
          {selectedMeshName}
        </Typography>

        <List
          className={"list-wrap bg-pink-500 w-full h-full"}
          sx={{
            display: "flex",
            flexDirection: "row",
            paddingTop: "10px !important",
            gap: { xs: 0.5, sm: 1, lg: 1.5, xl: 2 },
            justifyContent: {
              xs: "flex-start",
              sm: "center",
              lg: "center",
              xl: "center",
            },
            flexWrap: {
              xs: "nowrap",
              sm: "nowrap",
              lg: "nowrap",
              xl: "nowrap",
            },
            overflowX: {
              xs: "auto",
              sm: "visible",
              lg: "visible",
              xl: "visible",
            },
            alignItems: "flex-start",
            "@media (max-width: 1920px)": {
              flexWrap: "nowrap",
              overflowX: "visible",
            },
            "&::-webkit-scrollbar": {
              height: "4px",
            },
            "&::-webkit-scrollbar-track": {
              background: "rgba(0,0,0,0.1)",
              borderRadius: "2px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(0,0,0,0.3)",
              borderRadius: "2px",
            },
          }}
        >
          {Constants.COLOR_ARR.map((color, idx) => (
            <ListItem
              className={"color-item"}
              key={"color-" + idx}
              sx={{
                width: "auto",
                padding: 0,
                margin: { xs: "0 2px", sm: "0 4px" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                minWidth: { xs: "60px", sm: "70px" },
                minHeight:
                  selectedColorIdx === idx
                    ? { xs: "70px", sm: "80px" }
                    : { xs: "45px", sm: "50px" },
                flexShrink: 0,
                position: "relative",
              }}
            >
              <IconButton
                onClick={() => colorClick(color, idx)}
                className={
                  selectedColorIdx === idx ? "color-btn selected" : "color-btn"
                }
                style={{ backgroundColor: color.color }}
                sx={{
                  width: { xs: 35, sm: 40 },
                  height: { xs: 35, sm: 40 },
                  borderRadius: "50%",
                  border:
                    selectedColorIdx === idx
                      ? { xs: "2px solid #fff", sm: "3px solid #fff" }
                      : {
                          xs: "1px solid rgba(255,255,255,0.3)",
                          sm: "2px solid rgba(255,255,255,0.3)",
                        },
                  boxShadow:
                    selectedColorIdx === idx
                      ? `
                        0 6px 20px rgba(0,0,0,0.3),
                        0 0 0 4px rgba(59, 130, 246, 0.5),
                        inset 0 2px 4px rgba(255,255,255,0.3),
                        inset 0 -2px 4px rgba(0,0,0,0.2)
                      `
                      : `
                        0 4px 12px rgba(0,0,0,0.2),
                        inset 0 2px 4px rgba(255,255,255,0.3),
                        inset 0 -2px 4px rgba(0,0,0,0.1)
                      `,
                  transition: "all 0.3s ease",
                  transform:
                    selectedColorIdx === idx ? "scale(1.1)" : "scale(1)",
                  "&:hover": {
                    transform:
                      selectedColorIdx === idx ? "scale(1.15)" : "scale(1.05)",
                    boxShadow: `
                      0 8px 25px rgba(0,0,0,0.3),
                      inset 0 2px 4px rgba(255,255,255,0.4),
                      inset 0 -2px 4px rgba(0,0,0,0.1)
                    `,
                  },
                  "&:active": {
                    transform: "scale(0.95)",
                  },
                }}
              ></IconButton>
              {selectedColorIdx === idx ? (
                <ListItemText
                  className={"color-name"}
                  primary={color.name}
                  sx={{
                    position: "absolute",
                    top: { xs: "45px", sm: "50px" },
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 10,
                    minWidth: "max-content",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "& .MuiListItemText-primary": {
                      textAlign: "center",
                      margin: 0,
                    },
                    "& .MuiTypography-root": {
                      fontSize: { xs: "0.7rem", sm: "0.8rem" },
                      fontWeight: "bold",
                      color: "#333",
                      textShadow: "0 1px 2px rgba(255,255,255,0.8)",
                      padding: { xs: "3px 6px", sm: "4px 8px" },
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      margin: 0,
                      display: "block",
                    },
                  }}
                />
              ) : null}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
