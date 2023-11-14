// theme/themeConfig.ts
import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: "#3BA27A",
    colorInfo: "#446DB7",
    colorLink: "#3BA27A",
    colorText: "#1F3C4A",
    colorWhite: "#EDF4ED",
    colorError: "#F14947",
    colorSuccess: "#3BA27A",
    colorWarning: "#F9B53F",

    fontFamily: "Montserrat",
  },
  components: {
    Layout: {
      bodyBg: "#fff",
      headerBg: "#fff",
      controlPaddingHorizontal: 200,
      controlPaddingHorizontalSM: 100,
      siderBg: "#1F3C4A",
    },
    Menu: {
      darkItemBg: "#3BA27A",
      darkSubMenuItemBg: "#3BA27A",
      darkItemColor: "#EDF4ED",
      darkItemHoverBg: "rgba(0, 0, 0, 0.06)",
      darkItemSelectedBg: "#1F3C4A",
    },
    Typography: {
      titleMarginBottom: 5,
      titleMarginTop: 0,
    },
    Collapse: {
      colorBorder: "#3BA27A",
      colorText: "#1F3C4A",
    },
  },
};

export default theme;
