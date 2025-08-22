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
import {
  selectedColorState,
  selectedMeshState,
  cameraResetState,
} from "@src/atoms/Atoms";
import { useRecoilState } from "recoil";

export default function ColorComp() {
  //recoil 사용한 전역상태 관리
  const [selectedColorIdx, setSelectedColorIdx] =
    useRecoilState(selectedColorState);

  //클릭한 부분의 이름
  const [selectedMeshName] = useRecoilState(selectedMeshState);

  // 카메라 리셋 상태
  const [, setCameraReset] = useRecoilState(cameraResetState);

  // const [selected, setSelected] = useState(0);
  const padding = 16;
  const btnWidth = 30;
  const width = Constants.COLOR_ARR.length * (btnWidth + padding * 2);

  const colorClick = (color: (typeof Constants.COLOR_ARR)[0], idx: number) => {
    setSelectedColorIdx(idx);
    // 색상 팔레트 클릭 시 카메라를 전체 뷰로 리셋
    setCameraReset(true);
  };

  return (
    <Box
      className={"color-wrapper"}
      sx={{
        position: "fixed",
        bottom: { xs: 5, sm: 15, md: 20, lg: 25, xl: 30 },
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.3))",
        width: { xs: "90vw", sm: "auto", lg: "auto", xl: "auto" },
        maxWidth: { xs: "95vw", sm: "none", lg: "none", xl: "none" },
        "@media (max-width: 2290px)": {
          width: "90%",
          bottom: "30px",
        },
      }}
    >
      {" "}
      <Box
        className={"color-inner-wrap"}
        sx={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.85), rgba(240,240,240,0.8))",
          borderRadius: { xs: "12px", sm: "20px" },
          padding: {
            xs: "6px 6px 20px 6px",
            sm: "12px 16px 40px 16px",
          },
          boxShadow: `
            0 20px 40px rgba(0,0,0,0.25),
            0 15px 25px rgba(0,0,0,0.15),
            inset 0 2px 8px rgba(255,255,255,0.9),
            inset 0 -2px 8px rgba(0,0,0,0.1),
            inset 0 0 0 1px rgba(255,255,255,0.6)
          `,
          border: "1px solid rgba(255,255,255,0.7)",
          backdropFilter: "blur(15px) saturate(1.2)",
          WebkitBackdropFilter: "blur(15px) saturate(1.2)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          width: "100%",
          maxWidth: { xs: "95vw", sm: "none", lg: "none", xl: "1800px" },
          minWidth: { xs: "auto", sm: "auto", lg: "auto", xl: "auto" },
          overflowX: {
            xs: "auto",
            sm: "visible",
            lg: "visible",
            xl: "visible",
          },
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))",
            borderRadius: "inherit",
            zIndex: -1,
          },
          "&:hover": {
            transform: "translateY(-4px) scale(1.02)",
            boxShadow: `
              0 25px 50px rgba(0,0,0,0.3),
              0 20px 30px rgba(0,0,0,0.2),
              inset 0 2px 10px rgba(255,255,255,1),
              inset 0 -2px 10px rgba(0,0,0,0.15),
              inset 0 0 0 1px rgba(255,255,255,0.8)
            `,
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.85))",
          },
        }}
      >
        <Typography
          className={"current-part"}
          sx={{
            fontWeight: "bold !important",
            textAlign: "center",
            color: "#333",
            textShadow: `
              0 2px 4px rgba(255,255,255,0.9),
              0 1px 2px rgba(0,0,0,0.3),
              0 0 8px rgba(255,255,255,0.5)
            `,
            fontSize: { xs: "0.75rem", sm: "1rem" },
            lineHeight: 1.2,
            marginBottom: { xs: "4px", sm: "8px" },
            position: "relative",
            zIndex: 2,
            "&::before": {
              content: '""',
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "120%",
              height: "150%",
              background:
                "radial-gradient(ellipse, rgba(255,255,255,0.3) 0%, transparent 70%)",
              borderRadius: "50%",
              zIndex: -1,
            },
          }}
        >
          {selectedMeshName}
        </Typography>

        <List
          className={"list-wrap bg-pink-500 w-full h-full"}
          sx={{
            display: "flex",
            flexDirection: "row",
            paddingTop: { xs: "4px !important", sm: "10px !important" },
            gap: { xs: 0.3, sm: 1, lg: 1.5, xl: 2 },
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
              height: "3px",
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
                margin: { xs: "0 1px", sm: "0 4px" },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                minWidth: { xs: "50px", sm: "70px" },
                minHeight:
                  selectedColorIdx === idx
                    ? { xs: "55px", sm: "80px" }
                    : { xs: "35px", sm: "50px" },
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
                  width: { xs: 28, sm: 40 },
                  height: { xs: 28, sm: 40 },
                  borderRadius: "50%",
                  border:
                    selectedColorIdx === idx
                      ? {
                          xs: "3px solid rgba(255,255,255,0.9)",
                          sm: "4px solid rgba(255,255,255,0.9)",
                        }
                      : {
                          xs: "2px solid rgba(255,255,255,0.6)",
                          sm: "3px solid rgba(255,255,255,0.6)",
                        },
                  boxShadow:
                    selectedColorIdx === idx
                      ? `
                        0 10px 25px rgba(0,0,0,0.4),
                        0 6px 15px rgba(0,0,0,0.2),
                        0 0 0 6px rgba(59, 130, 246, 0.3),
                        inset 0 3px 6px rgba(255,255,255,0.6),
                        inset 0 -3px 6px rgba(0,0,0,0.3),
                        inset 0 0 0 1px rgba(255,255,255,0.4)
                      `
                      : `
                        0 8px 20px rgba(0,0,0,0.3),
                        0 4px 10px rgba(0,0,0,0.15),
                        inset 0 3px 6px rgba(255,255,255,0.5),
                        inset 0 -3px 6px rgba(0,0,0,0.2),
                        inset 0 0 0 1px rgba(255,255,255,0.3)
                      `,
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform:
                    selectedColorIdx === idx
                      ? "scale(1.15) translateY(-2px)"
                      : "scale(1)",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "10%",
                    left: "20%",
                    width: "30%",
                    height: "30%",
                    background:
                      "radial-gradient(ellipse, rgba(255,255,255,0.7) 0%, transparent 70%)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                  },
                  "&:hover": {
                    transform:
                      selectedColorIdx === idx
                        ? "scale(1.2) translateY(-4px)"
                        : "scale(1.1) translateY(-2px)",
                    boxShadow: `
                      0 15px 35px rgba(0,0,0,0.4),
                      0 8px 20px rgba(0,0,0,0.2),
                      inset 0 4px 8px rgba(255,255,255,0.7),
                      inset 0 -4px 8px rgba(0,0,0,0.2),
                      inset 0 0 0 1px rgba(255,255,255,0.5)
                    `,
                  },
                  "&:active": {
                    transform: "scale(0.95) translateY(1px)",
                    boxShadow: `
                      0 4px 12px rgba(0,0,0,0.3),
                      inset 0 2px 4px rgba(0,0,0,0.3),
                      inset 0 -1px 2px rgba(255,255,255,0.3)
                    `,
                  },
                }}
              ></IconButton>
              {selectedColorIdx === idx ? (
                <ListItemText
                  className={"color-name"}
                  primary={color.name}
                  sx={{
                    position: "absolute",
                    top: { xs: "32px", sm: "50px" },
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
                      fontSize: { xs: "0.6rem", sm: "0.8rem" },
                      fontWeight: "bold",
                      color: "#333",
                      textShadow: "0 1px 2px rgba(255,255,255,0.8)",
                      padding: { xs: "2px 4px", sm: "4px 8px" },
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
